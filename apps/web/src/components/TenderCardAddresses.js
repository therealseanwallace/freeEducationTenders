import { v4 as uuidv4 } from "uuid";

const TenderCardAddresses = ( { addresses } ) => {
  const addressesToDisplay = [];
  for (let i = 0; i < addresses.length; i += 1) {
    const address = addresses[i][0];
    if (address.Code) {
      if (!addressesToDisplay.includes(address.Code)) {
        addressesToDisplay.push(address.Code);
      }
    }
    if (address.region) {
      if (!addressesToDisplay.includes(address.region)) {
        addressesToDisplay.push(address.region);
      }
    }
    if (address.Region) {
      if (!addressesToDisplay.includes(address.Region)) {
        addressesToDisplay.push(address.Region);
      }
    }
    if (address.postalCode) {
      if (!addressesToDisplay.includes(address.postalCode)) {
        addressesToDisplay.push(address.postalCode);
      }
    }
    if (address.countryName) {
      if (!addressesToDisplay.includes(address.countryName)) {
        addressesToDisplay.push(address.countryName);
      }
    }
  }
  return (
    <div className="tender-card-addresses">
      <span className="tender-card-address-label">Delivery addresses:</span>
      {addressesToDisplay.map((address) => (
        <p key={uuidv4()} className="tender-card-address">
          {address}
        </p>
      ))}
    </div>
  )
};

export default TenderCardAddresses;
