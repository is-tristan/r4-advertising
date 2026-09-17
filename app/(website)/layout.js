// Styles
import "@/styles/main.scss"

// Lenis
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"

// Components
import Header from "@/components/layouts/header/header"
import LenisScrollToTop from "@/components/handlers/lenis-scroll-to-top"

export default function WebsiteLayout({ children }) {

  return (

    <ReactLenis root options={{ stopInertiaOnNavigate: true }}>

      <div id="app" className="app">

        <Header />

        <main id="appContent" className="appContent" aria-label="Main content">

          {children}

        </main>

      </div>

      <LenisScrollToTop />

    </ReactLenis>

  )

}
