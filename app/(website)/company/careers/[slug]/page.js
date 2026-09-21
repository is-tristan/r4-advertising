// Next
import { notFound } from "next/navigation"

// Sanity
import { client } from "@/sanity/lib/client"
import { careerBySlugQuery } from "@/sanity/lib/queries"

// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import CareersBanner from "@/components/screens/company/careers/singular/components/careers-banner"
import CareerContent from "@/components/screens/company/careers/singular/components/career-content"

async function getCareer(slug) {
  return client.fetch(careerBySlugQuery, { slug }, {
    next: { revalidate: 30 },
  })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const career = await getCareer(slug)

  if (!career) {
    return {}
  }

  const description = [
    career.contractType,
    career.location,
    career.description,
  ].filter(Boolean).join(" — ")

  return buildPageMetadata({
    title: career.title,
    description,
    image: career.image,
    path: `/company/careers/${career.slug}`,
  })
}

export default async function CareerDetailsPage({ params }) {

  const { slug } = await params

  const career = await getCareer(slug)

  if (!career) {
    notFound()
  }

  return (

    <>

      <CareersBanner
        title={career.title}
        contractType={career.contractType}
        location={career.location}
        salary={career.salary}
      />

      <CareerContent content={career.content} />

    </>

  )

}
