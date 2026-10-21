import { ImageResponse } from "next/og"

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

export default function OpenGraphImage() {

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
        }}
      >

        <img src={logoSrc} width={335} height={240} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>

          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: "-2px", lineHeight: 1 }}>

            <span>Trade</span>

            <span style={{ color: primaryColor }}>.</span>

            <span style={{ marginLeft: "24px" }}>Plan</span>

            <span style={{ color: primaryColor }}>.</span>

            <span style={{ marginLeft: "24px" }}>Activate</span>

            <span style={{ color: primaryColor }}>.</span>

          </div>

          <div style={{ display: "flex", marginTop: "28px", fontSize: 30, color: "rgba(255, 255, 255, 0.7)" }}>

            r4advertising.agency

          </div>

        </div>

      </div>

    ),

    size,

  )

}
