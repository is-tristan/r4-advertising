// Styles
import "@/styles/main.scss"

// Lenis
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"

// Components
import Header from "@/components/navigation/header/header"
import Footer from "@/components/navigation/footer/footer"
import LenisScrollToTop from "@/components/handlers/lenis-scroll-to-top"

export default function WebsiteLayout({ children }) {

  return (

    <ReactLenis root options={{ stopInertiaOnNavigate: true }}>

      <div id="app" className="app">

        <Header />

        <main id="appContent" className="appContent" aria-label="Main content" role="main">

          {children}

        </main>

        <Footer />

      </div>

      <LenisScrollToTop />

    </ReactLenis>

  )

}
