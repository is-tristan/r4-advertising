// Sanity
import { client } from "@/sanity/lib/client";
import { workGridQuery, workCategoriesQuery } from "@/sanity/lib/queries";

// Components
import Text from "@/components/content/text/text";
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import Button from "@/components/handlers/button";
import WorkGridItem from "./components/work-grid-item";
import WorkGridItemNav from "./components/work-grid-item-nav";

// Styles
import styles from "./styles/work-grid.module.scss";

export default async function WorkGrid({
    titleContainerClass = undefined,
    workGridContainerClass = undefined,
    hasNav = false,
    hasHeading = false,
    hasButton = false
}) {

    const [items, categories] = await Promise.all([
        client.fetch(workGridQuery, {}, {
            next: { revalidate: 1 },
        }),
        hasNav
            ? client.fetch(workCategoriesQuery, {}, {
                next: { revalidate: 1 },
            })
            : Promise.resolve([]),
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

                {hasHeading ? (

                    <Text
                        eyebrow={{
                            number: "01",
                            text: "Our Work",
                        }}
                        title={"Case studies from campaigns that moved the needle"}
                        descriptionClass={"A selection of work across sectors — each with its own brief, challenge, and outcome."}
                    />

                ) : (
                    <Eyebrow
                        number={"03"}
                        text={"Featured Work"}
                        type={"heading"}
                    />
                )}

            </div>

            <div className={`container noPaddingTop ${hasButton ? "noPaddingBottom" : undefined} gapMd ${styles.workGridContainer} ${workGridContainerClass}`}>

                {hasNav && categories?.length > 0 && (

                    <WorkGridItemNav items={categories} />

                )}

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

        </section>

    )

}
