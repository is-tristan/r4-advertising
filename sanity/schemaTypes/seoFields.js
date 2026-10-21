import { defineField } from "sanity"

export const seoFieldset = {
  name: "seo",
  title: "SEO",
  options: { collapsible: true, collapsed: true },
}

export function seoFields() {
  return [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      fieldset: "seo",
      description: "Shown in search results and browser tabs, exactly as written. Include \"| R4 Advertising\" at the end. Falls back to the title when empty.",
      validation: (rule) => rule.max(60).warning("Search engines usually cut titles off after around 60 characters"),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      fieldset: "seo",
      description: "Shown under the title in search results and when shared. Falls back to the excerpt or description when empty.",
      validation: (rule) => rule.max(160).warning("Search engines usually cut descriptions off after around 160 characters"),
    }),
  ]
}
