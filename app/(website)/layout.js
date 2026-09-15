// Styles
import "@/styles/main.scss"

// Lenis
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"

import Header from "@/components/layouts/header/header"

export default function WebsiteLayout({ children }) {

  return (

    <>

      <div id="app" className="app">

        <Header />

        <main id="appContent" className="appContent" aria-label="Main content">

          {children}

        </main>

      </div>

      <ReactLenis root />

    </>

  )

}
