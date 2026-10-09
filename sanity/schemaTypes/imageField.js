import { defineField } from "sanity"

export function imageAltField() {
  return defineField({
    name: "alt",
    title: "Alternative text",
    type: "string",
    description: "Describe the image for people who cannot see it.",
    validation: (rule) => rule.required().warning("Alt text is important for accessibility and SEO"),
  })
}
