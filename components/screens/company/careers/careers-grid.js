// Sanity
import { client } from "@/sanity/lib/client"
import { careersGridQuery } from "@/sanity/lib/queries"

// Components
import CareersGridList from "./components/careers-grid-list"

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

            <CareersGridList items={items} />

        </section>

    )

}
