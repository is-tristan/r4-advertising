// Components
import Banner from "@/components/sections/banner/banner";
import Content from "@/components/sections/content/content";
import OurModel from "@/components/screens/company/about/our-model/our-model-section";

export default function AboutPage() {

    return (

        <>
            <Banner
                eyebrow="About Us"
                title="Built for the Real World"
                description="<p>R4 is a media trading, planning and activation agency built around how media actually works in the real world.</p>"
            />

            <Content
                eyebrowNumber="02"
                eyebrowText="Leadership"
                title="Matt Jones MBE"
                description="<p>The business is led by Matt Jones MBE, an entrepreneur and agency leader with over twenty years' experience at senior level across the advertising and media industry.</p> <p>Matt has worked with all major global media owners, served as CMO for one of the UK's fastest-growing motor brands, founded and scaled successful B2C businesses, and built, scaled and exited the UK's fastest-growing independent media agency in 2019.</p> <p>That experience shapes how we operate today: commercially disciplined, outcome-led, and focused on performance rather than process.</p>"
                imagePosition="left"
                image="/images/company/about/about-matt-jones.jpg"
            />

            <Content
                eyebrowNumber="03"
                eyebrowText="Our Mission"
                title="Removing Inefficiency"
                description="<p>We exist to help brands grow by removing inefficiency from media investment.</p> <p>Too often, media underperforms not because of ambition or creativity, but because value is lost between buying, planning and activation. Trading decisions are disconnected from strategy. Campaigns go live without true accountability. Performance becomes assumed rather than engineered.</p> <p>R4 was built to change that.</p>"
                btnTextPrimary="Get started"
            />

            <OurModel />

        </>

    )

}