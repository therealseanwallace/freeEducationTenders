import { v4 as uuidv4 } from "uuid";

const Parties = ({ parties }) => (
    <div className="tender-card-parties">
      {parties.map((party) => {
        let email = "";
        let contactName = "";
        let url = "";
        let buyerProfile = "";

        if (party.contactPoint) {
          if (party.contactPoint.email) {
            email = party.contactPoint.email;
          }
          if (party.contactPoint.name) {
            contactName = party.contactPoint.name;
          }
          if (party.contactPoint.url) {
            url = party.contactPoint.url;
          }
          if (party.details) {
            if (party.details.buyerProfile) {
              buyerProfile = party.details.buyerProfile;
            }
          }
        }
        return (
          <div className="tender-card-party" key={uuidv4()}>
            <p className="tender-card-party-name" key={uuidv4()}>
              <span>Party name:</span> {party.name}
            </p>
            <p className="tender-card-party-contact-name" key={uuidv4()}>
              <span>Contact name:</span> {contactName}
            </p>
            <div className="tender-card-party-contact-email" key={uuidv4()}>
              <span>Contact email:</span>{" "}
              <p key={uuidv4()}>{email}</p>
            </div>
            <div className="tender-card-party-links">
              <p
                className="tender-card-party-contact-url"
                key={uuidv4()}
              >
                <span>Contact website:</span> {url}
              </p>
              <p
                className="tender-card-party-buyer-profile"
                key={uuidv4()}
              >
                <span>Buyer website:</span> {buyerProfile}
              </p>
            </div>

            <div className="tender-card-party-roles">
              <p className="tender-card-party-roles-label">Roles:</p>
              {party.roles.map((role) => (
                  <p className="tender-card-party-role" key={uuidv4()}>
                    {role}
                  </p>
                ))}
            </div>
            <hr />-
          </div>
          
        );
      })}
    </div>
  );

export default Parties;
