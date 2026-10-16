// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import InChargeCalendar from "./components/InChargeCalendar";

export const metadata = buildPageMetadata({
    title: "In-Charge Calendar",
    description: "Every out-of-home in-charge period for the next three years, standard and bus off-cycle. Find the dates you want, then book a conversation about them.",
    path: "/in-charge-calendar",
})

export default function InChargeCalendarPage() {

  return (

    <div className={`row headerOffset`}>

        <InChargeCalendar />

    </div>

  );

}
