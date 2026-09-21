// Next
import { notFound } from "next/navigation";

// Sanity
import { client } from "@/sanity/lib/client";
import { legalBySlugQuery } from "@/sanity/lib/queries";

// Components
import Banner from "@/components/sections/banner/banner";
import LegalContent from "@/components/screens/legal/singular/components/legal-content";

export default async function LegalPage({ params }) {

    const { slug } = await params;

    const legal = await client.fetch(legalBySlugQuery, { slug }, {
        next: { revalidate: 30 },
    });

    if (!legal) {

        notFound();

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

    );

}
