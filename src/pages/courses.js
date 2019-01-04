import React from 'react'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'

const Courses = ({ data }) => {
  const courses = data.allContentfulCourse.edges
  const postNode = {
    title: `Courses - ${config.siteTitle}`,
  }

  return (
    <Layout>
      <Helmet>
        <title>{`Courses - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postNode={postNode} pagePath="courses" customTitle />

      <Container>
        <PageTitle>Courses</PageTitle>
        {courses.map(({ node: course }) => (
          <h2 key={course.slug}>{course.title}</h2>
        ))}
      </Container>
    </Layout>
  )
}


export const query = graphql`
  query {
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
`

export default Courses
