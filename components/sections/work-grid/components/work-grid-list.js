"use client";

// Imports
import { useState, useTransition } from "react";

// Components
import WorkGridItem from "./work-grid-item";
import WorkGridItemNav from "./work-grid-item-nav";

// Actions
import { fetchWorkGridPage } from "../work-grid-actions";

// Styles
import styles from "../styles/work-grid.module.scss";

const pageSize = 6;

export default function WorkGridList({
    initialItems = [],
    initialTotal = 0,
    categories = [],
    hasNav = false,
    hasPagination = false,
    workGridContainerClass = undefined,
}) {

    const [items, setItems] = useState(initialItems);
    const [total, setTotal] = useState(initialTotal);
    const [categoryId, setCategoryId] = useState("");
    const [isPending, startTransition] = useTransition();

    const hasMore = hasPagination && items.length < total;

    function handleCategorySelect(nextCategoryId) {

        if (nextCategoryId === categoryId) {
            return;
        }

        startTransition(async () => {

            const { items: nextItems, total: nextTotal } = await fetchWorkGridPage({
                start: 0,
                end: pageSize,
                categoryId: nextCategoryId,
            });

            setCategoryId(nextCategoryId);
            setItems(nextItems);
            setTotal(nextTotal);

        });

    }

    function handleLoadMore() {

        startTransition(async () => {

            const { items: nextItems, total: nextTotal } = await fetchWorkGridPage({
                start: items.length,
                end: items.length + pageSize,
                categoryId,
            });

            setItems((currentItems) => [...currentItems, ...nextItems]);
            setTotal(nextTotal);

        });

    }

    return (

        <>

            <div className={`container noPaddingTop ${hasMore ? "noPaddingBottom" : undefined} gapMd ${styles.workGridContainer} ${workGridContainerClass}`}>

                {hasNav && categories?.length > 0 && (

                    <WorkGridItemNav
                        items={categories}
                        activeId={categoryId}
                        onSelect={handleCategorySelect}
                    />

                )}

                {items.length > 0 ? (

                    <div className={styles.workGridItems}>

                        {items.map((item, index) => (

                            <WorkGridItem key={item._id} item={item} index={index} />

                        ))}

                    </div>

                ) : (

                    <p className={styles.workGridEmpty}>No work found in this category.</p>

                )}

            </div>

            {hasMore && (

                <div className={`container centered noPaddingTop ${styles.workGridButtonContainer}`}>

                    <button
                        type="button"
                        className="btn primary"
                        onClick={handleLoadMore}
                        disabled={isPending}
                    >

                        <span>{isPending ? "Loading..." : "Load More"}</span>

                    </button>

                </div>

            )}

        </>

    )

}
