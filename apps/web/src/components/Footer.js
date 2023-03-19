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
          Service and Contracts Finder Service) and used under the{" "}
          <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
            Open Government Licence
          </a>
          . However, this website is NOT an official source and the maintainer
          of this website makes no claims regarding the accuracy or completeness
          of the information contained within. <br /> <br />
          Do NOT base your bidding decisions on this information -{" "}
          <strong>always</strong> check official sources!
        </p>
        <div className="acknowledgements-container">
          <h3>Acknowledgements</h3>
          <p className="acknowledgement">
            Loading gif by Nevit Dilmen at{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Lightness_rotate_36f_cw.gif">
              Wikimedia Commons.
            </a>
            <br />
            Licensed under{" "}
            <a href="https://commons.wikimedia.org/wiki/Commons:GNU_Free_Documentation_License,_version_1.2">
              GNU Free Documentation License, version 1.2
            </a>
          </p>
          <hr />
        </div>
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
