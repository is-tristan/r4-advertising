"use client";

// Imports
import { useState } from "react";

// Components
import ProjectedIncomeHeader from "./components/projected-income-header";
import ProjectedIncomeBody from "./components/projected-income-body";

// Styles
import styles from "./styles/projected-income.module.scss";

const projectedIncomeCounters = [
    {
        prefix: "£",
        start: 0,
        end: 500000,
        duration: 1.5,
        description: "Media Investment",
    },
    {
        suffix: "%",
        start: 0,
        end: 32.5,
        duration: 1.75,
        description: "Project VBD",
        color: "colorPrimary",
    },
    {
        prefix: "£",
        start: 0,
        end: 162500,
        duration: 2,
        description: "Commercial Value",
        color: "colorPrimary",
    },
]

const annualMediaCommitmentCounters = [
    {
        prefix: "£",
        start: 0,
        end: 500000,
        duration: 1.5,
        description: "Annual Media Commitment",
    },
    {
        suffix: "%",
        start: 0,
        end: 42.5,
        duration: 1.75,
        description: "Contract VBD",
        color: "colorPrimary",
    },
    {
        prefix: "£",
        start: 0,
        end: 212500,
        duration: 2,
        description: "Contractual Trade-Up Value",
        color: "colorPrimary",
    },
    {
        prefix: "£",
        start: 0,
        end: 712500,
        duration: 2.25,
        description: "Contractual Trade-Up Value",
    },
]

const projectedIncomeBodies = {
    project: {
        counters: projectedIncomeCounters,
        description: "Project VBD commercial value belongs to the client. It can be retained against the cost of the campaign, or traded up into additional media value.",
        buttonText: "Model your own position",
        buttonLink: "/calculator",
    },
    annualMediaCommitment: {
        counters: annualMediaCommitmentCounters,
        description: "Under an Annual Media Commitment, Contract VBD forms R4 Advertising's Contractual Trade-Up Commitment. Trade Up only.",
        buttonText: "Model your own position",
        buttonLink: "/calculator",
    },
}

export default function ProjectedIncome() {

    const [activeNav, setActiveNav] = useState("project");
    const activeBody = projectedIncomeBodies[activeNav] || projectedIncomeBodies.project;

    return (

        <section className={`row ${styles.projectedIncome}`}>

            <div className={`container noPaddingTop noPaddingBottom ${styles.projectedIncomeContainer}`}>

                <ProjectedIncomeHeader activeNav={activeNav} onNavClick={setActiveNav} />

                <ProjectedIncomeBody
                    key={activeNav}
                    name={activeNav}
                    counters={activeBody.counters}
                    description={activeBody.description}
                    buttonText={activeBody.buttonText}
                    buttonLink={activeBody.buttonLink}
                />

            </div>

        </section>

    );

}
