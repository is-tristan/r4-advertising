// Sanity
import { client } from "@/sanity/lib/client"
import { newsGridQuery } from "@/sanity/lib/queries"

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow"
import NewsItem from "./components/news-item"

// Styles
import styles from "./styles/news-grid.module.scss"

export default async function NewsGrid() {

    const items = await client.fetch(newsGridQuery, {}, {
        next: { revalidate: 30 },
    })

    if (!items?.length) {
        return null
    }

    return (

        <section className={styles.newsGrid}>

            <div className={`container noPaddingBottom`}>

                <Eyebrow
                    number="02"
                    text="Latest news"
                    type="heading"
                />

            </div>

            <div className={`container noPaddingTop ${styles.newsGridItems}`}>

                {items.map((item, index) => (

                    <NewsItem
                        key={item._id}
                        title={item.title}
                        slug={item.slug}
                        image={item.image}
                        excerpt={item.excerpt}
                        category={item.category}
                        author={item.author}
                        index={index}
                    />

                ))}

            </div>

        </section>

    )

}
