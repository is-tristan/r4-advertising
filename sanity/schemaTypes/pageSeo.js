import { defineField, defineType } from "sanity"
import { SearchIcon } from "@sanity/icons/Search"
import { apiVersion } from "../env"
import { seoRoutesData } from "../../data/seo-routes-data"
import { seoFields } from "./seoFields"

export const pageSeo = defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "path",
      title: "Page",
      type: "string",
      description: "The page these settings apply to.",
      options: {
        list: seoRoutesData,
      },
      validation: (rule) => rule.required().custom(async (value, context) => {
        if (!value) {
          return true
        }

        const client = context.getClient({ apiVersion })
        const publishedId = context.document?._id?.replace(/^drafts\./, "")
        const existing = await client.fetch(
          `count(*[_type == "pageSeo" && path == $path && !(_id in [$id, $draftId])])`,
          {
            path: value,
            id: publishedId,
            draftId: `drafts.${publishedId}`,
          }
        )

        if (existing > 0) {
          return "This page already has SEO settings"
        }

        return true
      }),
    }),
    ...seoFields({
      fieldset: null,
      titleFallback: "the title set in the code",
      descriptionFallback: "the description set in the code",
      imageFallback: "the default R4 share image",
    }),
  ],
  preview: {
    select: {
      path: "path",
      subtitle: "seoTitle",
      media: "seoImage",
    },
    prepare({ path, subtitle, media }) {
      const route = seoRoutesData.find((item) => item.value === path)

      return {
        title: route ? `${route.title} (${path})` : path || "New page",
        subtitle,
        media: media || SearchIcon,
      }
    },
  },
  orderings: [
    {
      title: "Page",
      name: "pathAsc",
      by: [{ field: "path", direction: "asc" }],
    },
  ],
})
