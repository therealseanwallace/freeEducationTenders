import { v4 as uuidv4 } from "uuid";

const TenderCardAddresses = ( { addresses } ) => {
  const addressesToDisplay = [];
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i][0];
    if (!addressesToDisplay.includes(address.Code)) {
      addressesToDisplay.push(address.Code);
    }
    if (!addressesToDisplay.includes(address.Region)) {
      addressesToDisplay.push(address.Region);
    }
  }
  console.log('addressesToDisplay = ', addressesToDisplay);
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
