// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import InChargeCalendar from "./components/InChargeCalendar";

export const metadata = buildPageMetadata({
    title: "Meet the Media Buying & Planning Specialists",
    description: "Book a conversation with R4 Advertising in Cardiff or London. Discuss your media investment, audience priorities and ambitions for your next campaign.",
    path: "/in-charge-calendar",
})

export default function InChargeCalendarPage() {

  return (

    <div className={`row headerOffset`}>

        <InChargeCalendar />

    </div>

  );

}
