import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import PostDate from '../components/PostDate'
import SEO from '../components/SEO'

const PostTemplate = ({ data, pageContext }) => {
  const {
    title,
    slug,
    body,
    publishDate,
    tags,
  } = data.contentfulPost
  const postNode = data.contentfulPost

  const previous = pageContext.prev
  const next = pageContext.next

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} postNode={postNode} postSEO />

      <Container>
        {tags && <TagList tags={tags} />}
        <PostDate date={publishDate} />
        <PageBody body={body} />
      </Container>
      <PostLinks previous={previous} next={next} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`

export default PostTemplate
