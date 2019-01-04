import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Helmet from 'react-helmet'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import config from '../utils/siteConfig'

const Index = ({ data, pageContext }) => {
  const courses = data.allContentfulCourse.edges
  const { currentPage } = pageContext
  const isFirstPage = currentPage === 1

  return (
    <Layout>
      <SEO />
      {!isFirstPage && (
        <Helmet>
          <title>{`${config.siteTitle} - Page ${currentPage}`}</title>
        </Helmet>
      )}
      <Container>
        <CardList>
          {courses.map(({ node: course }) => (
            <Card key={course.id} {...course} />
          ))}
        </CardList>
      </Container>
      <Pagination context={pageContext} />
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

export default Index
