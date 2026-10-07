import { career } from "./career"
import { careerCategory } from "./careerCategory"
import { careerLocation } from "./careerLocation"
import { legal } from "./legal"
import { news } from "./news"
import { newsAuthor } from "./newsAuthor"
import { newsCategory } from "./newsCategory"
import { team } from "./team"
import { teamCategory } from "./teamCategory"
import { work } from "./work"
import { workCategory } from "./workCategory"

export const schemaTypes = (context) => [
  work(context),
  workCategory,
  team(context),
  teamCategory,
  career(context),
  careerCategory,
  careerLocation,
  news(context),
  newsCategory,
  newsAuthor,
  legal,
]
