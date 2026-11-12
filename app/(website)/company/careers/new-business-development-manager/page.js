// SEO
import { buildRouteMetadata } from "@/lib/pageSeo"

// Components
import NewBusinessDevelopmentManager from "@/components/screens/company/careers/new-business-development-manager/new-business-development-manager"

export async function generateMetadata() {
  return buildRouteMetadata({
    title: "New Business Development Manager, London",
    description: "A revenue-owning new business role in London. One target, three ways to get paid, and a commission structure that pays you what you're actually worth.",
    path: "/company/careers/new-business-development-manager",
  })
}

export default function NewBusinessDevelopmentManagerPage() {
  return <NewBusinessDevelopmentManager />
}
