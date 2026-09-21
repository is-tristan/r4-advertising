"use server";

import { client } from "@/sanity/lib/client";
import { workGridCountQuery, workGridPageQuery } from "@/sanity/lib/queries";

const pageSize = 6;

export async function fetchWorkGridPage({
    start = 0,
    end = pageSize,
    categoryId = "",
} = {}) {

    const safeStart = Number.isInteger(start) && start >= 0 ? start : 0;
    const safeEnd = Number.isInteger(end) && end > safeStart ? end : safeStart + pageSize;
    const safeCategoryId = typeof categoryId === "string" ? categoryId : "";

    const [items, total] = await Promise.all([
        client.fetch(workGridPageQuery(safeStart, safeEnd), {
            categoryId: safeCategoryId,
        }, {
            next: { revalidate: 1 },
        }),
        client.fetch(workGridCountQuery, {
            categoryId: safeCategoryId,
        }, {
            next: { revalidate: 1 },
        }),
    ]);

    return {
        items: items ?? [],
        total: total ?? 0,
    };

}
