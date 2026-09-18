import { defineArrayMember, defineField } from "sanity"
import { contentVideoMember } from "./contentVideo"

export const portableTextMembers = [
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
  contentVideoMember,
]

export const portableTextField = (name, title) =>
  defineField({
    name,
    title,
    type: "array",
    of: portableTextMembers,
  })
