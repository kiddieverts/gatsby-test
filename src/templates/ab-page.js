import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const AbPageTemplate = ({ frontmatter }) => {
  console.log('x', frontmatter);

  return (
    <div className="container content">
      <div className="section">
        <h1>{frontmatter.title}</h1>

        {frontmatter.intro.blurbs.map((b, i) => (
          <div key={i}>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
            <img src={b.image.childImageSharp.fluid.src} alt="foo" />
          </div>
        ))}
      </div>

      <h3>{frontmatter.staff.title}</h3>

      <div className="section">
        {frontmatter.staff.people.map((s, i) =>
          (
            <div key={i}>
              <div>{s.name}</div>
              <div>{s.info}</div>
              <img src={s.image.childImageSharp.fluid.src} alt="foo" />
            </div>
          ))}
      </div>
    </div>
  );
}

const AbPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <AbPageTemplate frontmatter={frontmatter}></AbPageTemplate>
    </Layout>
  )
}

export default AbPage

export const abPageQuery = graphql`
  query AbPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        },
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text,
            title
          }
        },
        staff {
          title,
          people
          {
            name,
            info,
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
