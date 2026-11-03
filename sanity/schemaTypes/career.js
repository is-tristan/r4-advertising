import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
import { defineArrayMember, defineField, defineType } from "sanity"
import { CaseIcon } from "@sanity/icons/Case"
import { imageAltField } from "./imageField"
import { seoFields, seoFieldset } from "./seoFields"
import { contentSectionFields } from "./contentSection"

export const career = (context) => defineType({
  name: "career",
  title: "Career",
  type: "document",
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  fieldsets: [
    { name: "section1", title: "Section 1", options: { collapsible: true } },
    { name: "section2", title: "Section 2", options: { collapsible: true } },
    { name: "section3", title: "Section 3", options: { collapsible: true } },
    { name: "section4", title: "Section 4", options: { collapsible: true } },
    seoFieldset,
  ],
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
    ...contentSectionFields("section1", "Section 1"),
    ...contentSectionFields("section2", "Section 2"),
    ...contentSectionFields("section3", "Section 3"),
    ...contentSectionFields("section4", "Section 4"),
    ...seoFields({
      descriptionFallback: "the contract type, location and opening paragraph of the sections",
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
