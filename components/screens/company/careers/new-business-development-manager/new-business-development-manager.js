"use client";

// Next
import Link from "next/link";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import Button from "@/components/handlers/button";

// Icons
import { arrowLeft } from "@/utils/icons";

// Styles
import styles from "./styles/new-business-development-manager.module.scss";

const applyHref = "/company/careers/new-business-development-manager/apply";

const facts = [
    { label: "Location", value: "London" },
    { label: "Type", value: "Full-time" },
    { label: "Market", value: "UK" },
    { label: "Discipline", value: "Trade" },
];

const bar = [
    {
        number: "01",
        text: "Proven track record in sales, trading or new business, in media, advertising or an adjacent commercial environment. You have closed real deals.",
    },
    {
        number: "02",
        text: "You own the full cycle: prospecting, qualification, pitching, closing. You don't need a BDR. You don't need a warm list handed to you.",
    },
    {
        number: "03",
        text: "You understand value and margin, not just price.",
    },
    {
        number: "04",
        text: "You use CRM as a tool, not a chore. HubSpot is mandatory.",
    },
    {
        number: "05",
        text: "You are measured on revenue delivered. That's the only thing that matters.",
    },
    {
        number: "06",
        text: "You are motivated by money. Not titles, not perks, not the size of the group above you.",
    },
];

const upside = [
    {
        number: "01",
        text: "Uncapped commission, paid on revenue landed. No clawbacks, no moving goalposts.",
    },
    {
        number: "02",
        text: "Quarterly accelerators when you hit a full quarter.",
    },
    {
        number: "03",
        text: "Direct access to Planning and Activation, so deals close fast.",
    },
    {
        number: "04",
        text: "Full commercial ownership of your pipeline, your clients, your revenue.",
    },
    {
        number: "05",
        text: "Live earnings visibility, so you always know exactly what you've made and why.",
    },
    {
        number: "06",
        text: "Generous annual leave plus UK bank holidays.",
    },
    {
        number: "07",
        text: "Your birthday off.",
    },
    {
        number: "08",
        text: "Private healthcare after probation.",
    },
    {
        number: "09",
        text: "Company pension with employer contribution.",
    },
    {
        number: "10",
        text: "Laptop and full working setup.",
    },
];

const deals = [
    {
        code: "A",
        title: "Foundation Operator",
        base: "£60k",
        commission: "2%",
        description: "The biggest base, the steadiest floor. Built for disciplined traders who want a strong, predictable runway underneath them and commission on top. Lower risk, clean rhythm. You value stability, and you still expect to win.",
        atTarget: "£8,260",
        accelerator: "£11,520",
    },
    {
        code: "B",
        title: "Momentum Builder",
        base: "£50k",
        commission: "3.5%",
        description: "The commercial middle. Enough base to stay focused, enough commission to stay hungry. For traders who expect to hit target and want their earnings climbing with them. You expect to perform, and to be paid for it.",
        atTarget: "£9,872",
        accelerator: "£15,577",
    },
    {
        code: "C",
        title: "Revenue Hunter",
        base: "£40k",
        commission: "5%",
        description: "Lowest base. Highest rate. Every deal you land pays you more than it would anywhere else on this page. Built for traders who'd rather bet on themselves than be cushioned. You don't want a net. You want the upside.",
        atTarget: "£11,483",
        accelerator: "£19,633",
    },
];

function Reveal({
    children,
    className,
    delay = 0.15,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <motion.div
            ref={ref}
            className={className}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >

            {children}

        </motion.div>

    );
}

function Section({
    id,
    children,
    className,
}) {
    return (

        <section id={id} className={`row ${styles.section} ${className || ""}`}>

            <div className={`container condensed ${styles.container} gapLg noPaddingTop noPaddingBottom`}>

                {children}

            </div>

        </section>

    );
}

function NumberedGrid({ items }) {
    return (

        <div className={styles.numberedGrid}>

            {items.map((item, index) => (

                <Reveal
                    key={item.number}
                    className={styles.numberedItem}
                    delay={0.1 + (index * 0.04)}
                >

                    <span className="colorPrimary">{item.number}</span>

                    <p>{item.text}</p>

                </Reveal>

            ))}

        </div>

    );
}

export default function NewBusinessDevelopmentManager() {
    return (

        <>

            <section id="banner" className={`row headerOffset ${styles.section}`}>

                <div className={`container condensed ${styles.container} gapLg`}>

                    <Link href="/company/careers" className="textLink">

                        <div className="icon" dangerouslySetInnerHTML={{ __html: arrowLeft }} />

                        <span>Back to careers</span>

                    </Link>

                    <div className={styles.bannerHeading}>

                        <div className="content gapSm">

                            <Eyebrow number="Vacancy / Standard" separator="—" text="UK Market" />

                            <h1>New Business Development Manager, London</h1>

                        </div>

                        <Button text="Apply now" href={applyHref} className="primary" />

                    </div>

                    <dl className={styles.meta}>

                        {facts.map((fact) => (

                            <div key={fact.label}>

                                <dt>{fact.label}</dt>

                                <dd>{fact.value}</dd>

                            </div>

                        ))}

                    </dl>

                </div>

            </section>

            <Section>

                <div className={styles.prose}>

                    <Reveal className={styles.lead}>

                        <p>You love media. The campaigns, the clients, the commission. You just want a bigger cut, a cleaner sell, and to be able to look your clients in the eye when they ask where their money went.</p>

                        <p>That question is coming.</p>

                    </Reveal>

                    <Reveal delay={0.2}>

                        <p>The gap between what your clients pay for media and what it actually costs at trading rate is the largest hidden margin in the industry. It sits in the holding group's P&L. It has never appeared on a single invoice your clients have seen. And the rebate structures that generate it decide which media owners you're able to recommend. The plan you present isn't built around performance. It's built around who pays the group.</p>

                    </Reveal>

                    <Reveal delay={0.25}>

                        <p className={styles.statement}>We were built for this.</p>

                    </Reveal>

                    <Reveal delay={0.3}>

                        <p>We return all of the volume based discount to the client, contractually, all of it. We charge no management fees, and only take the agency commission. We provide each and every client a live dashboard meaning every client sees every pound, in real time. Our recommendations aren't compromised by anyone's rebate. We win on the number of clients who trust us, not the margin we strip from each one.</p>

                    </Reveal>

                    <Reveal delay={0.35}>

                        <p>Same media owners. Same formats. The volume based margin back where it belongs, and a commission structure that pays you what you're actually worth.</p>

                    </Reveal>

                    <Reveal delay={0.4}>

                        <p className={styles.statement}>That's our model. Its honest, transparent and now we're scaling.FAST.</p>

                    </Reveal>

                    <Reveal delay={0.45}>

                        <p>We are not a boutique. Not a lifestyle agency. Not a Cardiff curiosity that got lucky. We are building the largest independent media agency in the UK. The networks have had the market to themselves long enough. The model that sustains them is exposed. The window to take it is now, and we are already moving.</p>

                    </Reveal>

                </div>

            </Section>

            <Section id="opportunity">

                <Eyebrow number="01" text="The Opportunity" />

                <Reveal>

                    <p>We are not hiring managers. We are not hiring order-takers. We are hiring the people who will run this business as it scales. Traders and Business Development Managers who become Senior Traders, then Trading Directors, then Heads of Trade. Authority, team-build responsibility and long-term incentive come with it, earned by revenue delivered, not time served.</p>

                </Reveal>

            </Section>

            <Section id="role">

                <Eyebrow number="02" text="The Role" />

                <div className={styles.prose}>

                    <Reveal>

                        <p className={styles.statement}>A New Business Development Manager at R4 is a revenue owner.</p>

                    </Reveal>

                    <Reveal delay={0.2}>

                        <p>You build your own pipeline. You take briefs directly from clients. You work with Planning to shape commercial solutions. You close.</p>

                    </Reveal>

                    <Reveal delay={0.25}>

                        <p className={styles.statement}>No lead-passing. You originate, you structure, you close, and when revenue lands, you get paid.</p>

                    </Reveal>

                    <Reveal delay={0.3}>

                        <p>You carry a full target from day one. It doesn't ramp. It doesn't move. That target is your share of where this business is going.</p>

                    </Reveal>

                    <Reveal delay={0.35}>

                        <p>If a full target from day one sounds unreasonable, consider what you're actually selling. A client within a network agency is losing a fortune every year to fees they can't see and will never be shown. That isn't a hard close. It's an open goal.</p>

                    </Reveal>

                </div>

            </Section>

            <Section id="bar">

                <div className={styles.sectionHeading}>

                    <Eyebrow number="03" text="The Bar" />

                    <h2>What we're looking for.</h2>

                </div>

                <NumberedGrid items={bar} />

                <div className={styles.fitGrid}>

                    <Reveal className={styles.callout}>

                        <span className="colorPrimary">This is not the role if</span>

                        <p>If you need a warm inbound pipeline to get started, this is not the role. If you need a manager to tell you what to work on each morning, this is not the role. If a full target from day one reads as a risk rather than an opportunity, this is not the role. If you're comfortable with the way the industry currently works, this is definitely not the role.</p>

                    </Reveal>

                    <Reveal className={styles.callout} delay={0.25}>

                        <span className="colorPrimary">This is the role if</span>

                        <p>If you want full autonomy over your pipeline and your clients, this is the role. If you want flexible working judged on what you land, not when you're at a desk, this is the role. If you want real seniority, real decision-making, and promotion earned on revenue rather than waited out, this is the role. If you want an award-winning culture that backs the people who back themselves, where Rebel of the Year goes to the one who ignored how it's always been done and won anyway, this is exactly the role.</p>

                    </Reveal>

                </div>

            </Section>

            <Section id="target">

                <div className={styles.target}>

                    <div className={styles.targetCopy}>

                        <Eyebrow number="04" text="The Target" />

                        <h2>One number. Three ways to earn it.</h2>

                        <p>Same target across all options. The difference is how you're paid, not what's expected.</p>

                    </div>

                    <Reveal className={styles.figure} delay={0.25}>

                        <strong>£163k</strong>

                        <span>Per month</span>

                    </Reveal>

                </div>

            </Section>

            <Section id="deal">

                <div className={styles.sectionHeading}>

                    <Eyebrow number="05" text="The Deal" />

                    <h2>Choose how you get <span className="colorPrimary">paid.</span></h2>

                    <p>One target. Three ways to earn against it. The difference is how you carry risk, not what's expected of you.</p>

                </div>

                <div className={styles.dealGrid}>

                    {deals.map((deal, index) => (

                        <Reveal key={deal.code} className={styles.dealCard} delay={0.1 + (index * 0.08)}>

                            <span className={`${styles.optionLabel} colorPrimary`}>{deal.code} / Option</span>

                            <h3>{deal.title}</h3>

                            <div className={styles.dealStats}>

                                <div>

                                    <span>Base</span>

                                    <strong>{deal.base}</strong>

                                </div>

                                <div>

                                    <span>Commission</span>

                                    <strong className="colorPrimary">{deal.commission}</strong>

                                </div>

                            </div>

                            <p>{deal.description}</p>

                            <div className={styles.earnings}>

                                <span className="colorPrimary">At target / Monthly</span>

                                <div className={styles.earningRow}>

                                    <span>Base + Commission</span>

                                    <strong>{deal.atTarget}</strong>

                                </div>

                                <div className={styles.earningRow}>

                                    <span>Accelerator month</span>

                                    <strong>{deal.accelerator}</strong>

                                </div>

                                <p className={styles.note}>Month 3 commission doubles when the full quarter target is hit.</p>

                            </div>

                        </Reveal>

                    ))}

                </div>

            </Section>

            <Section id="upside">

                <div className={styles.sectionHeading}>

                    <Eyebrow number="06" text="The Upside" />

                    <h2>What you get.</h2>

                </div>

                <NumberedGrid items={upside} />

            </Section>

            <Section id="path">

                <div className={styles.sectionHeading}>

                    <Eyebrow number="07" text="The Path" />

                    <h2>Defined promotion path.</h2>

                    <Reveal className={styles.pathItem} delay={0.2}>

                        <span className={styles.pathNumber}>1</span>

                        <p>Progression is based on revenue delivered. Not tenure. Not politics. Not noise.</p>

                    </Reveal>

                </div>

            </Section>

            <section id="apply" className={`row ${styles.section} ${styles.applySection}`}>

                <div className={`container condensed ${styles.container} noPaddingTop`}>

                    <div className={styles.apply}>

                        <div className={styles.applyText}>

                            <Eyebrow number="08" text="Next Move" />

                            <h2>Ready to apply?</h2>

                            <p>Tell us which commission structure you're choosing and why. That answer tells us more than your CV.</p>

                        </div>

                        <Button text="Apply now" href={applyHref} className="primary" />

                    </div>

                </div>

            </section>

        </>

    );
}
