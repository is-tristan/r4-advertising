import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
import { defineArrayMember, defineField, defineType } from "sanity"
import { ImageIcon } from "@sanity/icons/Image"
import { PlayIcon } from "@sanity/icons/Play"
import { imageAltField } from "./imageField"
import { videoFileDescription, videoFileOptions, videoFileRule } from "./videoFile"
import { seoFields, seoFieldset } from "./seoFields"
import { contentSectionFields } from "./contentSection"

export const work = (context) => defineType({
  name: "work",
  title: "Work",
  type: "document",
  icon: PlayIcon,
  orderings: [orderRankOrdering],
  fieldsets: [
    { name: "trade", title: "Section 1 / Trade", options: { collapsible: true } },
    { name: "plan", title: "Section 2 / Plan", options: { collapsible: true } },
    { name: "activate", title: "Section 3 / Activate", options: { collapsible: true } },
    { name: "result", title: "Section 4 / Result", options: { collapsible: true } },
    seoFieldset,
  ],
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
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "video",
      title: "Featured Video",
      type: "file",
      description: videoFileDescription,
      options: videoFileOptions,
      validation: (rule) => videoFileRule(rule),
    }),
    defineField({
      name: "videoPoster",
      title: "Featured Video Poster",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        imageAltField(),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          title: "Image",
          icon: ImageIcon,
          options: {
            hotspot: true,
          },
          fields: [
            imageAltField(),
          ],
        }),
        defineArrayMember({
          type: "file",
          title: "Video",
          icon: PlayIcon,
          description: videoFileDescription,
          options: videoFileOptions,
          validation: (rule) => videoFileRule(rule),
          fields: [
            defineField({
              name: "videoPoster",
              title: "Video Poster",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                imageAltField(),
              ],
            }),
          ],
          preview: {
            select: {
              title: "asset.originalFilename",
              media: "videoPoster",
            },
            prepare({ title, media }) {
              return {
                title: title || "Video",
                media,
              }
            },
          },
        }),
      ],
      options: {
        layout: "grid",
      },
    }),
    ...contentSectionFields("trade", "Trade", "Negotiation & Value Creation", "Trade"),
    ...contentSectionFields("plan", "Plan", "Strategic Media Planning", "Plan"),
    ...contentSectionFields("activate", "Activate", "Campaign Execution", "Activate"),
    ...contentSectionFields("result", "Result", "Measurable Outcomes", "Result"),
    defineField({
      name: "testimonialContent",
      title: "Testimonial Content",
      type: "text",
      rows: 6,
    }),
    ...seoFields(),
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
