import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { logo } from "@/utils/icons"

export const alt = "R4 Advertising — Trade. Plan. Activate."

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

const primaryColor = "#DBF903"
const darkColor = "#07080c"
const lightColor = "#FFFFFF"

const logoSvg = logo
  .replace(/<\?xml[^>]*\?>/, "")
  .replace("fill=\"currentColor\"", `fill="${primaryColor}" width="335" height="240"`)

const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`

const fontsDirectory = join(process.cwd(), "public/fonts")

const dotStyle = {
  width: "22px",
  height: "22px",
  marginLeft: "6px",
  marginBottom: "14px",
  borderRadius: "11px",
  flexShrink: 0,
  backgroundColor: primaryColor,
}

const wordStyle = {
  flexShrink: 0,
}

export default async function OpenGraphImage() {

  const [futuraPtCondensed, acidGrotesk] = await Promise.all([
    readFile(join(fontsDirectory, "futura-pt-condensed-extra-bold.ttf")),
    readFile(join(fontsDirectory, "acid-grotesk-regular.ttf")),
  ])

  return new ImageResponse(

    (

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: darkColor,
          color: lightColor,
          fontFamily: "Acid Grotesk",
        }}
      >

        <img src={logoSrc} width={335} height={240} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              fontFamily: "Futura PT Condensed",
              fontSize: 116,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >

            <span style={wordStyle}>Trade</span>

            <div style={dotStyle} />

            <span style={{ ...wordStyle, marginLeft: "28px" }}>Plan</span>

            <div style={dotStyle} />

            <span style={{ ...wordStyle, marginLeft: "28px" }}>Activate</span>

            <div style={dotStyle} />

          </div>

          <div style={{ display: "flex", marginTop: "32px", fontSize: 30, color: "rgba(255, 255, 255, 0.7)" }}>

            r4advertising.agency

          </div>

        </div>

      </div>

    ),

    {
      ...size,
      fonts: [
        {
          name: "Futura PT Condensed",
          data: futuraPtCondensed,
          weight: 800,
          style: "normal",
        },
        {
          name: "Acid Grotesk",
          data: acidGrotesk,
          weight: 400,
          style: "normal",
        },
      ],
    },

  )

}
