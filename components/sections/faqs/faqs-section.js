"use client";

// React
import { useRef } from "react";
import { useInView } from "motion/react";

// Components
import Heading from "@/components/content/text";
import FaqItem from "./components/faq-item";
import WavyBackground from "@/components/decoration/wavy-background";

// Styles
import styles from "@/styles/components/sections/faqs-section.module.scss";

// Data
const defaultFaqData = [
    {
        question: "What makes Dakota London different?",
        answer: "<p>Dakota London is a hair extension-only salon making high-quality extensions more affordable, accessible, and comfortable to wear. Every stylist is trained at our headquarters by our master trainers and coaches, so results look seamless and natural every time. That's backed by industry-leading craftsmanship and our 120-day quality guarantee</p>"
    },
    {
        question: "How long do hair extensions last?",
        answer: "<p>With proper care and maintenance, Micro-Link Extensions can last 3-4 months, while Micro-Weft Extensions typically last 6-8 weeks before needing a refresh. Regular maintenance appointments will help keep your extensions looking flawless.</p>"
    },
    {
        question: "Do hair extensions damage natural hair?",
        answer: "<p>No! Both Micro-Link and Hand-Tied Extensions are applied without glue, tape, or heat, making them some of the safest, least-damaging methods available. Our expert stylists ensure proper installation and care to protect the integrity of your natural hair.</p>"
    },
    {
        question: "How much do hair extensions cost?",
        answer: "<p>Pricing is based on your desired length, volume, and the number of strands or wefts needed. First-time clients receive 50% off installation! You can view our full pricing details <a href='/find-a-salon'>here</a>.</p>"
    },
    {
        question: "How can I get an exact price for my extensions?",
        answer: "<p>Because pricing is fully customized, we recommend using our <a href='/find-a-salon'>Instant Quote tool</a> or booking a consultation at your nearest Dakota London salon for a personalized quote.</p>"
    },
    {
        question: "Do I need a consultation before booking?",
        answer: "<p>While not required, a consultation is highly recommended to determine the best extension method, color match, and volume for your hair goals.</p>"
    },
    {
        question: "Do you offer financing or payment plans?",
        answer: "<p>We currently do not offer financing, but clients are welcome to pay using major credit cards, Apple Pay, and other accepted payment methods.</p>"
    },
    {
        question: "Can I wash and style my extensions like normal?",
        answer: "<p>Yes! Dakota London extensions are 100% real human hair, meaning you can wash, curl, straighten, and style them just like your natural hair. We'll provide detailed care instructions after your installation.</p>"
    },
    {
        question: "How often should I come in for maintenance?",
        answer: "<p>Micro-Link Extensions: Every 6-8 weeks<br>Micro-Weft Extensions: Every 6-8 weeks<br>Maintenance visits help reposition the extensions as your natural hair grows.</p>"
    },
    {
        question: "What products should I use on my extensions?",
        answer: "<p>We recommend using sulfate-free shampoos and conditioners and avoiding heavy oils near the bonds or wefts to prolong the life of your extensions.</p>"
    },
    {
        question: "Can I swim or work out with hair extensions?",
        answer: "<p>Yes! Extensions can withstand normal exercise, swimming, and daily activities. However, we recommend braiding your hair before swimming and using a leave-in conditioner to prevent tangling.</p>"
    },
    {
        question: "How long does the installation process take?",
        answer: "<p>Most appointments take 1.5 to 2 hours, depending on the number of extensions being applied.</p>"
    },
    {
        question: "What is your cancellation policy?",
        answer: "<p>We kindly ask for at least 24 hours notice for cancellations or rescheduling to avoid a cancellation fee.</p>"
    },
    {
        question: "Do you offer color-matching services?",
        answer: "<p>Yes! During your consultation, we'll expertly color-match your extensions to blend seamlessly with your natural hair.</p>"
    },
    {
        question: "Can I bring my own hair extensions?",
        answer: "<p>We only install Dakota London's premium-quality, ethically sourced extensions to ensure the highest standards of seamless blending, longevity, and damage-free application.</p>"
    }
]

export default function FaqsSection({
    eyebrow = "Your go-to guide",
    title = "Frequently Asked Questions",
    description = "Everything you need to know about Dakota London, from your first appointment on.",
    data = defaultFaqData
}) {

    const faqsRef = useRef(null);
    const isInView = useInView(faqsRef, { once: true, amount: 0.25 });

    return (

        <section className={`row bgDark ${styles.faqsSection}`} ref={faqsRef}>

            <div className="container relative colorLight noPaddingBottom">

                <div className="innerContent" data-alignment="centered">

                    <Heading
                        eyebrow={eyebrow}
                        title={title}
                        hasSeperator={true}
                        seperatorType="centered"
                        description={description}
                    />

                </div>

            </div>

            <div className="container relative noPaddingTop">

                <div className={styles.faqItems}>

                    {data.map((item, index) => (

                        <FaqItem key={index} index={index} question={item.question} answer={item.answer} isInView={isInView} />

                    ))}

                </div>

            </div>

            <WavyBackground />

        </section>

    )

}