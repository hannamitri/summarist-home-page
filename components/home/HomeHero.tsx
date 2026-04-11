import Container from "../ui/Container";
import Button from "../ui/Button";

interface HomeHeroProps {
  onLoginClick: () => void;
}

export default function HomeHero({ onLoginClick }: HomeHeroProps) {
  return (
    <section id="landing">
      <Container>
        <div className="landing__wrapper">
          <div className="landing__content">
            <div className="landing__content__title">
              Gain more knowledge <br className="remove--tablet" />
              in less time
            </div>

            <div className="landing__content__subtitle">
              Great summaries for busy people,
              <br className="remove--tablet" />
              individuals who barely have time to read,
              <br className="remove--tablet" />
              and even people who don&apos;t like to read.
            </div>

            <Button className="home__cta--btn" onClick={onLoginClick}>
              Login
            </Button>
          </div>

          <figure className="landing__image--mask">
            <img src="/assets/landing.png" alt="Landing illustration" />
          </figure>
        </div>
      </Container>
    </section>
  );
}