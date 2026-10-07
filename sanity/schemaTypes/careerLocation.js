import { defineField, defineType } from "sanity"
import { PinIcon } from "@sanity/icons/Pin"

export const careerLocation = defineType({
  name: "careerLocation",
  title: "Location",
  type: "document",
  icon: PinIcon,
  fields: [
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
})
