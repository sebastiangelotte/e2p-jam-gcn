import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'


const CourseTemplate = ({ data }) => {
  const { title, description } = data.contentfulCourse

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>

      <Container>
        <PageTitle>{title}</PageTitle>
        <PageBody body={description} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulCourse(slug: { eq: $slug }) {
      title
      slug
      description {childMarkdownRemark {html}}
    }
  }
`

export default CourseTemplate
