// Components
import ProjectedIncomeBodyCounters from "./projected-income-body-counters";
import ProjectedIncomeBodyDescription from "./projected-income-body-description";

// Styles
import styles from "../styles/projected-income.module.scss";

export default function ProjectedIncomeBody({
    name = "project",
    counters = [],
    description = null,
    buttonText = "Model your own position",
    buttonLink = "/calculator",
}) {

    return (

        <div className={styles.projectedIncomeBody} data-name={name}>

            <ProjectedIncomeBodyCounters counters={counters} />

            <ProjectedIncomeBodyDescription
                description={description}
                buttonText={buttonText}
                buttonLink={buttonLink}
            />

        </div>

    );

}
