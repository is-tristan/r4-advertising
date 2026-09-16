import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
import { defineArrayMember, defineField, defineType } from "sanity"
import { PlayIcon } from "@sanity/icons/Play"

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
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
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
  ],
  preview: {
    select: {
      title: "title",
      media: "videoPoster",
      subtitle: "description",
    },
  },
})
