import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"
import { DocumentsIcon } from "@sanity/icons/Documents"
import { FolderIcon } from "@sanity/icons/Folder"
import { PlayIcon } from "@sanity/icons/Play"
import { SearchIcon } from "@sanity/icons/Search"

function createSingleton(S, typeName, title, icon) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title)
    )
}

export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              createSingleton(S, "servicesPage", "Services", DocumentsIcon),
              createSingleton(S, "workPage", "Work", PlayIcon),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Work")
        .child(
          S.list()
            .title("Work")
            .items([
              orderableDocumentListDeskItem({
                type: "work",
                title: "Work",
                S,
                context,
              }),
              S.documentTypeListItem("workCategory").title("Work Categories"),
            ])
        ),
      S.listItem()
        .title("Team")
        .child(
          S.list()
            .title("Team")
            .items([
              orderableDocumentListDeskItem({
                type: "team",
                title: "Team Members",
                S,
                context,
              }),
              S.documentTypeListItem("teamCategory").title("Team Categories"),
            ])
        ),
      S.listItem()
        .title("Careers")
        .child(
          S.list()
            .title("Careers")
            .items([
              orderableDocumentListDeskItem({
                type: "career",
                title: "Roles",
                S,
                context,
              }),
              S.documentTypeListItem("careerCategory").title("Career Categories"),
              S.documentTypeListItem("careerLocation").title("Locations"),
            ])
        ),
      S.listItem()
        .title("News")
        .child(
          S.list()
            .title("News")
            .items([
              orderableDocumentListDeskItem({
                type: "news",
                title: "Articles",
                S,
                context,
              }),
              S.documentTypeListItem("newsCategory").title("Categories"),
              S.documentTypeListItem("newsAuthor").title("Authors"),
            ])
        ),
      S.documentTypeListItem("legal").title("Legal"),
      S.divider(),
      S.listItem()
        .title("SEO")
        .icon(SearchIcon)
        .child(
          S.documentTypeList("pageSeo")
            .title("Page SEO")
            .defaultOrdering([{ field: "path", direction: "asc" }])
        ),
    ])
