import { defineArrayMember, defineField } from "sanity"
import { ImageIcon } from "@sanity/icons/Image"
import { portableTextBlockMember, portableTextField } from "./portableText"
import { imageAltField } from "./imageField"

const contentSectionImageMember = defineArrayMember({
  type: "image",
  title: "Image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    imageAltField(),
  ],
})

export const contentSectionMembers = [
  portableTextBlockMember,
  contentSectionImageMember,
]

export const contentSectionFields = (name, title, eyebrow, sectionTitle) => [
  defineField({
    name: `${name}Eyebrow`,
    title: "Eyebrow",
    type: "string",
    fieldset: name,
    initialValue: eyebrow,
  }),
  defineField({
    name: `${name}Title`,
    title: "Title",
    type: "string",
    fieldset: name,
    initialValue: sectionTitle,
  }),
  portableTextField(`${name}Content`, `${title} Content`, name, contentSectionMembers),
]
