import Container from "../ui/Container";

export default function HomeFooter() {
  return (
    <section id="footer">
      <Container>
        <div className="footer__top--wrapper">
          <div className="footer__block">
            <div className="footer__link--title">Actions</div>
            <div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Summarist Magazine</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Cancel Subscription</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Help</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Contact us</a>
              </div>
            </div>
          </div>

          <div className="footer__block">
            <div className="footer__link--title">Useful Links</div>
            <div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Pricing</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Summarist Business</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Gift Cards</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Authors & Publishers</a>
              </div>
            </div>
          </div>

          <div className="footer__block">
            <div className="footer__link--title">Company</div>
            <div>
              <div className="footer__link--wrapper">
                <a className="footer__link">About</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Careers</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Partners</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Code of Conduct</a>
              </div>
            </div>
          </div>

          <div className="footer__block">
            <div className="footer__link--title">Other</div>
            <div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Sitemap</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Legal Notice</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Terms of Service</a>
              </div>
              <div className="footer__link--wrapper">
                <a className="footer__link">Privacy Policies</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__copyright--wrapper">
          <div className="footer__copyright">
            Copyright &copy; 2023 Summarist.
          </div>
        </div>
      </Container>
    </section>
  );
}