// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import Text from "@/components/content/text/text";
import FormClient from "@/components/handlers/forms/form-client";

export const metadata = buildPageMetadata({
    title: "Contact",
    description: "Have a campaign, a media budget, or want to understand what your media could be doing differently? Get in touch with R4.",
    path: "/contact",
})

export default function ContactPage() {

    return (

        <div className={`row headerOffset`}>

            <div className={`container`}>

                <div className={`content`} data-alignment="centered">

                    <Text
                        eyebrow={{
                            number: "01",
                            text: "Contact us",
                        }}
                        titleTag="h1"
                        title="Let's Talk"
                        description="<p class='large ch50'>Have a campaign, a media budget or simply want to understand what your media could be doing differently?</p>"
                    />

                    <FormClient
                        portalId="139805116"
                        formId="44133cd6-2f6f-43d2-8137-fe2d5e7bee21"
                    />

                </div>

            </div>

        </div>

    )

}
