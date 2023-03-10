const Parties = ({ parties }) => {
  return (
    <div className="tender-card-parties">
      {parties.map((party, index) => {
        return (
          <div className="tender-card-party">
            <p className="tender-card-party-name">{party.name}</p>
            <div className="tender-card-party-roles">
              {party.roles.map((role, index) => {
                return (
                  <p className="tender-card-party-role" key={index}>
                    {role}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Parties;
