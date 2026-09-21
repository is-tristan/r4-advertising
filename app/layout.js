// Fonts
import localFont from "next/font/local"

// SEO
import { siteDescription, siteName, getSiteUrl } from "@/lib/seo"

const acidGrotesk = localFont({
  display: "swap",
  variable: "--font-acid-grotesk",
  src: [
    {
      path: "../public/fonts/acid-grotesk-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/acid-grotesk-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
})

const futuraPtCondensed = localFont({
  display: "swap",
  variable: "--font-futura-pt",
  src: [
    {
      path: "../public/fonts/futura-pt-condensed-extra-bold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
})

const corporateABq = localFont({
  display: "swap",
  variable: "--font-corporate-a",
  src: [
    {
      path: "../public/fonts/corporate-a-bq-medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
})

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
}

export default function RootLayout({ children }) {

  return (

    <html lang="en" className={`${acidGrotesk.variable} ${futuraPtCondensed.variable} ${corporateABq.variable}`} >

      <body>

        {children}

      </body>

    </html>

  )

}
