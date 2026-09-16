import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
import { defineField, defineType } from "sanity"
import { UserIcon } from "@sanity/icons/User"

export const team = (context) => defineType({
  name: "team",
  title: "Team",
  type: "document",
  icon: UserIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "team", context }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "teamCategory" }],
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "image",
    },
  },
})
