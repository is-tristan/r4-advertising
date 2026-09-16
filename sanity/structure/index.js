import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"

export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
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
    ])
