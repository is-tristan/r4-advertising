// Next
import { notFound } from "next/navigation"

// Sanity
import { client } from "@/sanity/lib/client"
import { careerBySlugQuery } from "@/sanity/lib/queries"

// Components
import CareersBanner from "@/components/screens/company/careers/singular/components/careers-banner"
import CareerContent from "@/components/screens/company/careers/singular/components/career-content"

export default async function CareerDetailsPage({ params }) {

    const { slug } = await params

    const career = await client.fetch(careerBySlugQuery, { slug }, {
        next: { revalidate: 30 },
    })

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
