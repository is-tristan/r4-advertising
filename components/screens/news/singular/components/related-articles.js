// Sanity
import { client } from "@/sanity/lib/client"
import { relatedNewsQuery } from "@/sanity/lib/queries"

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow"
import NewsItem from "@/components/screens/news/components/news-item"

// Styles
import styles from "../styles/news-singular.module.scss"

export default async function RelatedArticles({
    slug,
    category,
}) {

    const items = await client.fetch(relatedNewsQuery, {
        slug,
        category: category || null,
    }, {
        next: { revalidate: 30 },
    })

    if (!items?.length) {

        return null

    }

    return (

        <section className={styles.relatedArticles}>

            <div className={`container noPaddingBottom`}>

                <Eyebrow
                    number="02"
                    text="Related articles"
                    type="heading"
                />

            </div>

            <div className={`container noPaddingTop ${styles.relatedArticlesItems}`}>

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
