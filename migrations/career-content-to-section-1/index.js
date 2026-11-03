import { at, defineMigration, setIfMissing } from "sanity/migrate"

export default defineMigration({
  title: "Move career content into section 1",
  documentTypes: ["career"],
  filter: "defined(content) && !defined(section1Content)",
  migrate: {
    document(doc) {
      return [
        at("section1Content", setIfMissing(doc.content)),
      ]
    },
  },
})
