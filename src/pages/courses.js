import React from 'react'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'
import CardList from '../components/CardList'
import Card from '../components/Card';

const Courses = ({ data }) => {
  const courses = data.allContentfulCourse.edges
  const postNode = {
    title: `Kurser - ${config.siteTitle}`,
  }

  return (
    <Layout>
      <Helmet>
        <title>{`Kurser - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postNode={postNode} pagePath="kurser" customTitle />

      <Container>
        <PageTitle>Kurser</PageTitle>
        <CardList>
          {courses.map(({ node: course }) => (
            <Card key={course.id} {...course} />
          ))}
        </CardList>
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
          description {childMarkdownRemark {html}}
        }
      }
    }
  }
  `

export default Courses
