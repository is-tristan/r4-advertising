import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
import { defineArrayMember, defineField, defineType } from "sanity"
import { PlayIcon } from "@sanity/icons/Play"
import { portableTextField } from "./portableText"

export const work = (context) => defineType({
  name: "work",
  title: "Work",
  type: "document",
  icon: PlayIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "work", context }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) =>
        rule
          .integer()
          .min(1900)
          .max(2100),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this work in the home carousel",
      initialValue: false,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "workCategory" }],
        }),
      ],
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "videoPoster",
      title: "Video Poster",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
      options: {
        layout: "grid",
      },
    }),
    portableTextField("tradeContent", "Trade Content"),
    portableTextField("planContent", "Plan Content"),
    portableTextField("activateContent", "Activate Content"),
    portableTextField("resultContent", "Result Content"),
    portableTextField("testimonialContent", "Testimonial Content"),
  ],
  preview: {
    select: {
      title: "title",
      media: "videoPoster",
      subtitle: "description",
      year: "year",
      featured: "featured",
    },
    prepare({ title, media, subtitle, year, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: [year, subtitle].filter(Boolean).join(" — "),
        media,
      }
    },
  },
})
