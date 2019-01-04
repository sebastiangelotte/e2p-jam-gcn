const config = require('./src/utils/siteConfig')
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const loadCourses = new Promise((resolve, reject) => {
    graphql(`
    {
      allContentfulCourse(
        sort: { fields: [date], order: DESC }
        limit: 10000
      ) {
        edges {
          node {
            slug
            date
            title
            subTitle
          }
        }
      }
    }
  `).then(result => {
      const courses = result.data.allContentfulCourse.edges
      const coursesPerFirstPage = config.coursesPerHomePage
      const coursesPerPage = config.coursesPerPage
      const numPages = Math.ceil(
        courses.slice(coursesPerFirstPage).length / coursesPerPage
      )

      // Create each individual course
      courses.forEach((edge, i) => {
        const prev = i === 0 ? null : courses[i - 1].node
        const next = i === courses.length - 1 ? null : courses[i + 1].node
        createPage({
          path: `${edge.node.slug}/`,
          component: path.resolve(`./src/templates/course.js`),
          context: {
            slug: edge.node.slug,
            prev,
            next,
          },
        })
      })
      // Create main home page
      createPage({
        path: `/`,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          limit: coursesPerFirstPage,
          skip: 0,
          numPages: numPages + 1,
          currentPage: 1,
        },
      })
      resolve()
    })
  })

  const loadPages = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPage {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      const pages = result.data.allContentfulPage.edges
      pages.map(({ node }) => {
        createPage({
          path: `${node.slug}/`,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })

  return Promise.all([loadPages, loadCourses])
}
