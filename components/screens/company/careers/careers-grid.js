// Sanity
import { client } from "@/sanity/lib/client"
import { careersGridQuery } from "@/sanity/lib/queries"

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow"
import CareerItem from "./components/career-item"

// Styles
import styles from "./styles/career-grid.module.scss"

export default async function CareersGrid() {

    const items = await client.fetch(careersGridQuery, {}, {
        next: { revalidate: 30 },
    })

    if (!items?.length) {
        return null
    }

    return (

        <section className={styles.careersGrid}>

            <div className={`container noPaddingBottom`}>

                <Eyebrow
                    number="02"
                    text="Current openings"
                    type="heading"
                />

            </div>

            <div className={`container noPaddingTop flexAuto flexAutoConstrained`}>

                {items.map((item, index) => (

                    <CareerItem
                        key={item._id}
                        title={item.title}
                        slug={item.slug}
                        category={item.category}
                        location={item.location}
                        contractType={item.contractType}
                        salary={item.salary}
                        image={item.image}
                        excerpt={item.excerpt}
                        index={index}
                    />

                ))}

            </div>

        </section>

    )

}
