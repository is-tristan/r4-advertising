// Sanity
import { client } from "@/sanity/lib/client"
import { teamGridQuery } from "@/sanity/lib/queries"

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow"
import TeamItem from "./components/team-item"

// Styles
import styles from "./styles/team-grid.module.scss"

export default async function TeamGrid() {

    const items = await client.fetch(teamGridQuery, {}, {
        next: { revalidate: 30 },
    })

    if (!items?.length) {
        return null
    }

    return (

        <section className={styles.teamGrid}>

            <div className={`container noPaddingBottom`}>

                <Eyebrow
                    number="02"
                    text="Meet the team"
                    type="heading"
                />

            </div>

            <div className={`container noPaddingTop flexAuto flexAutoConstrained`}>

                {items.map((item, index) => (

                    <TeamItem
                        key={item._id}
                        name={item.name}
                        category={item.category}
                        position={item.position}
                        image={item.image}
                        email={item.email}
                        linkedIn={item.linkedIn}
                        index={index}
                    />

                ))}

            </div>

        </section>

    )

}
