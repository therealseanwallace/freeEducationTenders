import githubLogo from "../assets/github-mark.png";
import linkedInLogo from "../assets/LI-In-Bug.png";

const Footer = (props) => {
  const returnPrivacyPolicyButton = () => {
    if (props.showPrivacyPolicy) {
      return (
        <button onClick={props.togglePrivacyPolicy}>Hide Privacy Policy</button>
      );
    } else {
      return (
        <button onClick={props.togglePrivacyPolicy}>Show Privacy Policy</button>
      );
    }
  };
  return (
    <footer>
      <hr />
      <div className="footer-top">
        {returnPrivacyPolicyButton()}
        <p className="version-statement">
          <strong>Version:</strong> 0.3.0 <br />
          <strong>Please note:</strong> this web application is in a pre-release
          or “alpha” stage of development and may undergo frequent or extensive
          changes or shutdowns or prolonged delays in loading results.
          <br />
          Several features have yet to be added.
          <br />
          In the meantime, please bear with me 🙂
        </p>
      </div>
      <div className="footer-bottom">
        <p className="disclaimer">
          Tenders are sourced from official UK government sources (Find A Tender
          Service and Contracts Finder Service). However, this website is NOT an
          official source and the maintainer of this website makes no claims
          regarding the accuracy or completeness of the information contained
          within. <br /> <br />
          Do NOT base your bidding decisions on this information -{" "}
          <strong>always</strong> check official sources!
        </p>
        <div className="copyright-statement-social-links-container">
          <p className="copyright-statement">
            Designed and Developed by Sean Patrick Wallace © 2023
          </p>
          <div className="social-links">
            <a
              className="github-link"
              href="https://github.com/therealseanwallace/freeEducationTenders"
            >
              <img
                src={githubLogo}
                alt="GitHub link"
                className="social-link-logo"
              />
            </a>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/sean-wallace-338a53198/"
            >
              <img
                src={linkedInLogo}
                alt="LinkedIn link"
                className="social-link-logo"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
