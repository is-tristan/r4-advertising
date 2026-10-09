// Styles
import "@/styles/main.scss"

// Lenis
import "lenis/dist/lenis.css"

// Components
import Header from "@/components/navigation/header/header"
import Footer from "@/components/navigation/footer/footer"
import LenisScrollToTop from "@/components/handlers/lenis-scroll-to-top"
import SmoothScroll from "@/components/handlers/smooth-scroll"

export default function WebsiteLayout({ children }) {

  return (

    <SmoothScroll>

      <div id="app" className="app">

        <a className="skipLink" href="#appContent">

          Skip to content

        </a>

        <Header />

        <main id="appContent" className="appContent" tabIndex={-1}>

          {children}

        </main>

        <Footer />

      </div>

      <LenisScrollToTop />

    </SmoothScroll>

  )

}
