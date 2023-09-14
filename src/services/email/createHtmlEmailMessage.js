const createHtmlEmailMessage = (emailMessage, locationData, coordinates, ip) => {
  const { name, email, message, phone, organization } = emailMessage;
  const { latitude, longitude, accuracy } = coordinates;
  const { type, address: { road, county, state, country } } = locationData

  console.log(locationData);

  return `
  <head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  </head>
  <h1>Message from portfolio server ${new Date(
    Date.now()
  ).toLocaleString()}</h1>
  <h2>${ip}</h2>
  <hr>
  <h2>Contact Name</h2>
  <p>${name}<p>
  <hr>
  <h2>Email Address<h2>
  <p>${email}</p>
  <hr>
  <h2>Message<h2>
  <p>${message}</p>
  <hr>
  ${phone ? `<h2>Phone Number</h2><p>${phone}</p>` : ''}
  <hr>
  ${organization ? `<h2>Organization</h2><p>${organization}</p>` : ''}
  <hr>
  <h2>IP Address:</h2>
  <p>${ip}</p>
  <hr>
  <h2>Coordinate Data:</h2>
  <p>Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}</p>
  <hr>
  <h2>GPS Location Data:</h2>
  <p>Road: ${road}, County: ${county}, State: ${state}, Country: ${country}, Type: ${type}</p>
  <hr>
  <h2>Map</h2>
  <hr>
  `;
};

// console.log(createHtmlEmailMessage())
export default createHtmlEmailMessage;
