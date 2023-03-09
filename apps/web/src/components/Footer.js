const Footer = (props) => {
  return (
    <footer>
      <hr />
      <div className="footer-top">
        <p className="version-statement">
          <strong>Version:</strong> 0.1.1 <br />
          <strong>Please note:</strong> this web application is in a pre-release
          or “alpha” stage of development and may undergo frequent or extensive
          changes or shutdowns or prolonged delays in loading results.
          <br />
          Several features have yet to be added - most importantly,
          accessibility.
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
        <p className="author-statement">
          Designed and Developed by Sean Patrick Wallace © 2023
        </p>
        <div className="social-links">
          <a
            className="github-link"
            href="https://github.com/therealseanwallace/freeEducationTenders"
          >
            GitHub
          </a>
          <a
            className="linkedin-link"
            href="https://www.linkedin.com/in/sean-wallace-338a53198/"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
