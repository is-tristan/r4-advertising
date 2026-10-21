// Components
import { GoogleTagManager } from "@next/third-parties/google";

// Styles
import "@/styles/main.scss"

// Lenis
import "lenis/dist/lenis.css"

// Components
import Header from "@/components/navigation/header/header"
import Footer from "@/components/navigation/footer/footer"
import LenisScrollToTop from "@/components/handlers/lenis-scroll-to-top"
import SmoothScroll from "@/components/handlers/smooth-scroll"

// SEO
import { getOrganizationJsonLd, serializeJsonLd } from "@/lib/seo"

export default function WebsiteLayout({ children }) {

  return (

    <SmoothScroll>

      <GoogleTagManager gtmId="GTM-KMNF368K" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(getOrganizationJsonLd()) }}
      />

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
