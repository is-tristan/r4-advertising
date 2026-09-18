// Components
import Text from "@/components/content/text/text";
import FormClient from "@/components/handlers/forms/form-client";

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

                    <FormClient />

                </div>

            </div>

        </div>

    )

}
