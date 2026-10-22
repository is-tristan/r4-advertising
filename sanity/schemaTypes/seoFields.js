import { defineArrayMember, defineField } from "sanity"
import { imageAltField } from "./imageField"

export const seoFieldset = {
  name: "seo",
  title: "SEO",
  options: { collapsible: true, collapsed: true },
}

export function seoFields({ fieldset = "seo", titleFallback = "the title", descriptionFallback = "the excerpt or description", imageFallback = "the main image, then the default R4 share image" } = {}) {
  const fieldOptions = fieldset ? { fieldset } : {}

  return [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      ...fieldOptions,
      description: `Shown in search results and browser tabs, exactly as written. Include "| R4 Advertising" at the end. Falls back to ${titleFallback} when empty.`,
      validation: (rule) => rule.max(60).warning("Search engines usually cut titles off after around 60 characters"),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      ...fieldOptions,
      description: `Shown under the title in search results and when shared. Falls back to ${descriptionFallback} when empty.`,
      validation: (rule) => rule.max(160).warning("Search engines usually cut descriptions off after around 160 characters"),
    }),
    defineField({
      name: "seoKeywords",
      title: "Keywords",
      type: "array",
      ...fieldOptions,
      description: "Press Enter after each keyword.",
      of: [defineArrayMember({ type: "string" })],
      options: {
        layout: "tags",
      },
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "seoImage",
      title: "Share Image",
      type: "image",
      ...fieldOptions,
      description: `Shown when the page is shared on social media and messaging apps. Best at 1200 × 630. Falls back to ${imageFallback} when empty.`,
      options: {
        hotspot: true,
      },
      fields: [
        imageAltField(),
      ],
    }),
    defineField({
      name: "seoNoIndex",
      title: "Hide from search engines",
      type: "boolean",
      ...fieldOptions,
      description: "Asks search engines not to list this page, and removes it from the sitemap.",
      initialValue: false,
    }),
  ]
}
