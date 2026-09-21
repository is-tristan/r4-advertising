// Next
import { notFound } from "next/navigation"

// Sanity
import { client } from "@/sanity/lib/client"
import { legalBySlugQuery } from "@/sanity/lib/queries"

// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import Banner from "@/components/sections/banner/banner"
import LegalContent from "@/components/screens/legal/singular/components/legal-content"

async function getLegal(slug) {
  return client.fetch(legalBySlugQuery, { slug }, {
    next: { revalidate: 30 },
  })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const legal = await getLegal(slug)

  if (!legal) {
    return {}
  }

  return buildPageMetadata({
    title: legal.title,
    description: legal.description,
    path: `/legal/${legal.slug}`,
  })
}

export default async function LegalPage({ params }) {

  const { slug } = await params

  const legal = await getLegal(slug)

  if (!legal) {
    notFound()
  }

  return (

    <>

      <Banner
        containerClass="condensed noPaddingBottom"
        eyebrow="Legal"
        title={legal.title}
        description={null}
      />

      <LegalContent content={legal.content} />

    </>

  )

}
