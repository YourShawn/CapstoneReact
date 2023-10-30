import React, { useState } from "react";
import Footer from "../../component/footer";
import Header from "../../component/header";
import styles from "./service.module.scss";

const PageContent = ({ heading, image, children }) => {
  return (
    <>
      <h2>{heading}</h2>
      <div
        className={styles.content_img}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={styles.description}>{children}</div>
    </>
  );
};

const Service = () => {
  const [activeOption, setActiveOption] = useState(0);
  const options = ["EMR", "Lab Tests", "Admin Panel"];

  return (
    <div className={styles.service_page}>
      <Header />
      <div className={styles.service_wrapper}>
        <div className={styles.sidebar}>
          <ul>
            {options.map((option, index) => (
              <li
                className={activeOption === index ? styles.active : ""}
                key={index}
                onClick={() => setActiveOption(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <main className={styles.service_content}>
          {activeOption === 0 ? (
            <PageContent heading="EMR" image="/service/emr.jpg">
              <span>
              Reduce the time spent scheduling by 80% and provide schedules that meet physician request. 
              Simplify your time-off and shift exchanges with less communication errors and fewer delays.
              Ensure shift coverage. Improve work-life balance. Prevent overtime.
              Securely store and maintain data critical to both patients & practices overall efficiency.
              can access COVID-19 vaccination information.

              </span>
            </PageContent>
          ) : activeOption === 1 ? (
            <PageContent heading="Lab Tests" image="/service/labTest.jpg">
              <span>
              Laboratory tests check a sample of your blood, urine, or body tissues. A technician or your doctor analyzes the test samples to see if your results fall within the normal range. The tests use a range because what is normal differs from person to person. Many factors affect test results. These include:

Your sex, age and race, What you eat and drink, Medicines you take, How well you followed pre-test instructions.
              </span>
            </PageContent>
          ) : activeOption === 2 ? (
            <PageContent heading="Admin Panel" image="/service/adminPanel.jpg">
              <span>
              Able to monitor the doctor's appointments, lab results, and medicines. In addition, it should have a system for doctors to update patients' records. This is because patients need to be updated about their appointment times and any changes in their health.
              </span>
            </PageContent>
          ) : (
            <></>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
