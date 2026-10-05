// Sanity
import { client } from "@/sanity/lib/client";
import { featuredVideoQuery } from "@/sanity/lib/queries";

// Components
import FeaturedVideoItem from "./components/featured-video-item";

export default async function FeaturedVideo({
    headerOffset = true,
    containerClass = undefined
}) {

    const work = await client.fetch(featuredVideoQuery, {}, {
        next: { revalidate: 1 },
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
                />

            </div>

        </section>
    )
}
