// Sanity
import { client } from "@/sanity/lib/client";
import {
    workGridQuery,
    workGridCountQuery,
    workCategoriesQuery,
} from "@/sanity/lib/queries";

// Components
import Text from "@/components/content/text/text";
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import Button from "@/components/handlers/button";
import WorkGridItem from "./components/work-grid-item";
import WorkGridList from "./components/work-grid-list";

// Styles
import styles from "./styles/work-grid.module.scss";

export default async function WorkGrid({
    titleContainerClass = undefined,
    workGridContainerClass = undefined,
    hasNav = false,
    hasTitle = false,
    hasButton = false,
    hasPagination = false,
}) {

    const isInteractive = hasNav || hasPagination;

    const [items, categories, total] = await Promise.all([
        client.fetch(workGridQuery, {}, {
            next: { revalidate: 1 },
        }),
        hasNav
            ? client.fetch(workCategoriesQuery, {}, {
                next: { revalidate: 1 },
            })
            : Promise.resolve([]),
        hasPagination
            ? client.fetch(workGridCountQuery, { categoryId: "" }, {
                next: { revalidate: 1 },
            })
            : Promise.resolve(0),
    ]);

    if (!items?.length) {
        return null;
    }

    return (

        <section
            id="workGrid"
            className={`row ${styles.workGridSection}`}
            style={{ gap: "0" }}
        >

            <div className={`container noPaddingBottom ${styles.workGridTitleContainer} ${titleContainerClass}`}>

                {hasTitle ? (

                    <Text
                        eyebrow={{
                            number: "01",
                            text: "Our Work",
                        }}
                        title={"Case studies from campaigns that moved the needle"}
                        titleTag="h1"
                        titleClass={"sectionTitle"}
                        description={"<p class='large'>A selection of work across sectors — each with its own brief, challenge, and outcome.</p>"}
                    />

                ) : (

                    <Eyebrow
                        number={"03"}
                        text={"Featured Work"}
                        type={"heading"}
                    />

                )}

            </div>

            {isInteractive ? (

                <WorkGridList
                    initialItems={items}
                    initialTotal={total}
                    categories={categories}
                    hasNav={hasNav}
                    hasPagination={hasPagination}
                    workGridContainerClass={workGridContainerClass}
                />

            ) : (

                <>

                    <div className={`container noPaddingTop ${hasButton ? "noPaddingBottom" : undefined} gapMd ${styles.workGridContainer} ${workGridContainerClass}`}>

                        <div className={styles.workGridItems}>

                            {items.map((item, index) => (

                                <WorkGridItem key={item._id} item={item} index={index} />

                            ))}

                        </div>

                    </div>

                    {hasButton && (

                        <div className={`container centered noPaddingTop ${styles.workGridButtonContainer}`}>

                            <Button href="/work" text="View All Work" />

                        </div>

                    )}

                </>

            )}

        </section>

    )

}
