// SEO
import { buildRouteMetadata } from "@/lib/pageSeo"

// Components
import InChargeCalendar from "./components/InChargeCalendar";

export async function generateMetadata() {
    return buildRouteMetadata({
        title: "Meet the Media Buying & Planning Specialists",
        description: "Book a conversation with R4 Advertising in Cardiff or London. Discuss your media investment, audience priorities and ambitions for your next campaign.",
        path: "/in-charge-calendar",
    })
}

export default function InChargeCalendarPage() {

  return (

    <div className={`row headerOffset`}>

        <InChargeCalendar />

    </div>

  );

}
