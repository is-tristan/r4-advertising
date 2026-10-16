// Sanity
import { client } from "@/sanity/lib/client";
import { featuredVideoQuery, servicesFeaturedVideoQuery } from "@/sanity/lib/queries";

// Components
import FeaturedVideoItem from "./components/featured-video-item";

const featuredVideoQueries = {
    work: featuredVideoQuery,
    services: servicesFeaturedVideoQuery,
};

export default async function FeaturedVideo({
    headerOffset = true,
    containerClass = undefined,
    eager = false,
    source = "work",
}) {

    const query = featuredVideoQueries[source] || featuredVideoQuery;

    const work = await client.fetch(query, {}, {
        next: { revalidate: 30 },
    });

    if (!work?.video) {
        return null;
    }

    return (

        <section id="featuredVideo" className={`row ${headerOffset ? "headerOffset" : undefined}`}>

            <div className={`container ${containerClass}`}>

                <FeaturedVideoItem
                    video={work.video}
                    videoPoster={work.videoPoster}
                    title={work.title}
                    eager={eager}
                />

            </div>

        </section>
    )
}
