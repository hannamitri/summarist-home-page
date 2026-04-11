import Container from "../ui/Container";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";

export default function HomeFeatures() {
  return (
    <section id="features">
      <Container>
        <div className="section__title">Understand books in few minutes</div>

        <div className="features__wrapper">
          <div className="features">
            <div className="features__icon">
              <AiFillFileText />
            </div>
            <div className="features__title">Read or listen</div>
            <div className="features__sub--title">
              Save time by getting the core ideas from the best books.
            </div>
          </div>

          <div className="features">
            <div className="features__icon">
              <AiFillBulb />
            </div>
            <div className="features__title">Find your next read</div>
            <div className="features__sub--title">
              Explore book lists and personalized recommendations.
            </div>
          </div>

          <div className="features">
            <div className="features__icon">
              <AiFillAudio />
            </div>
            <div className="features__title">Briefcasts</div>
            <div className="features__sub--title">
              Gain valuable insights from briefcasts
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}