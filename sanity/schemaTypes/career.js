import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
import { defineArrayMember, defineField, defineType } from "sanity"
import { CaseIcon } from "@sanity/icons/Case"
import { imageAltField } from "./imageField"

export const career = (context) => defineType({
  name: "career",
  title: "Career",
  type: "document",
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "career", context }),
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
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        imageAltField(),
      ],
    }),
    defineField({
      name: "category",
      title: "Career Category",
      type: "reference",
      to: [{ type: "careerCategory" }],
    }),
    defineField({
      name: "locations",
      title: "Locations",
      type: "array",
      description: "Select up to 2 locations. They are shown as London / Cardiff.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "careerLocation" }],
        }),
      ],
      validation: (rule) => rule.max(2).unique(),
    }),
    defineField({
      name: "contractType",
      title: "Contract Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Internship", value: "internship" },
          { title: "Freelance", value: "freelance" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "salary",
      title: "Salary",
      type: "string",
      description: "e.g. £30,000 or Competitive",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "blank",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      location0: "locations.0.title",
      location1: "locations.1.title",
      media: "image",
    },
    prepare({ title, category, location0, location1, media }) {
      const location = [location0, location1].filter(Boolean).join(" / ")

      return {
        title,
        subtitle: [category, location].filter(Boolean).join(" · "),
        media,
      }
    },
  },
})
