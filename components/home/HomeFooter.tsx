import Container from "../ui/Container";

const footerSections = [
  {
    title: "Actions",
    links: ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"],
  },
  {
    title: "Useful Links",
    links: ["Pricing", "Summarist Business", "Gift Cards", "Authors & Publishers"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Code of Conduct"],
  },
  {
    title: "Other",
    links: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
  },
];

export default function HomeFooter() {
  return (
    <section id="footer">
      <Container>
        <div className="footer__top--wrapper">
          {footerSections.map((section) => (
            <div className="footer__block" key={section.title}>
              <div className="footer__link--title">{section.title}</div>

              <div>
                {section.links.map((link) => (
                  <div className="footer__link--wrapper" key={link}>
                    <a className="footer__link">{link}</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
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