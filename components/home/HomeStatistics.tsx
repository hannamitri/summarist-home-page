"use client";

import { useEffect, useState } from "react";
import Container from "../ui/Container";

const firstHeadings = [
  "Enhance your knowledge",
  "Achieve greater success",
  "Improve your health",
  "Develop better parenting skills",
  "Increase happiness",
  "Be the best version of yourself!",
];

const secondHeadings = [
  "Expand your learning",
  "Accomplish your goals",
  "Strengthen your vitality",
  "Become a better caregiver",
  "Improve your mood",
  "Maximize your abilities",
];

export default function HomeStatistics() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % firstHeadings.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <Container>
        <div className="statistics__wrapper">
          <div className="statistics__content--header">
            {firstHeadings.map((heading, index) => (
              <div
                key={heading}
                className={`statistics__heading ${
                  activeIndex === index ? "statistics__heading--active" : ""
                }`}
              >
                {heading}
              </div>
            ))}
          </div>

          <div className="statistics__content--details">
            <div className="statistics__data">
              <div className="statistics__data--number">93%</div>
              <div className="statistics__data--title">
                of Summarist members <b>significantly increase</b> reading
                frequency.
              </div>
            </div>

            <div className="statistics__data">
              <div className="statistics__data--number">96%</div>
              <div className="statistics__data--title">
                of Summarist members <b>establish better</b> habits.
              </div>
            </div>

            <div className="statistics__data">
              <div className="statistics__data--number">90%</div>
              <div className="statistics__data--title">
                have made <b>significant positive</b> change to their lives.
              </div>
            </div>
          </div>
        </div>

        <div className="statistics__wrapper">
          <div className="statistics__content--details statistics__content--details-second">
            <div className="statistics__data">
              <div className="statistics__data--number">91%</div>
              <div className="statistics__data--title">
                of Summarist members <b>report feeling more productive</b> after
                incorporating the service into their daily routine.
              </div>
            </div>

            <div className="statistics__data">
              <div className="statistics__data--number">94%</div>
              <div className="statistics__data--title">
                of Summarist members have <b>noticed an improvement</b> in their
                overall comprehension and retention of information.
              </div>
            </div>

            <div className="statistics__data">
              <div className="statistics__data--number">88%</div>
              <div className="statistics__data--title">
                of Summarist members <b>feel more informed</b> about current
                events and industry trends since using the platform.
              </div>
            </div>
          </div>

          <div className="statistics__content--header statistics__content--header-second">
            {secondHeadings.map((heading, index) => (
              <div
                key={heading}
                className={`statistics__heading ${
                  activeIndex === index ? "statistics__heading--active" : ""
                }`}
              >
                {heading}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}