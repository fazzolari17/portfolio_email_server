const createHtmlEmailMessage = (emailMessage, locationData, coordinates, ipLocationData, request) => {
  const { name, email, message, phone, organization } = emailMessage;
  const { latitude, longitude, accuracy } = coordinates;

  if (!locationData.road) {
    locationData = { addresstype: null, display_name: null, type: null, address: { road: null, county: null, state: null, country: null }}
  }

  const { addresstype, display_name, type, address: { road, county, state, country } } = locationData

  console.log(ipLocationData.location)


  return `
  </html>
    <head>
      <style>
        hr { border: 1px solid red; }
        h3 { display: inline; }
        p { display: inline; }
        .label { font-size: 16px; font-weight: 500; }
        .data { font-size: 14px; font-weight: 300; }
        .block { display: block; margin-bottom: .5rem; }
        .flex { display: flex; align-items: flex-start; justify-content: space-between; }
      </style>
    </head>
    <body>
      <h1>Message from portfolio server ${new Date(
        Date.now()
      ).toLocaleString()}</h1>
      <hr>
      <h2>Contact Name</h2>
      <h3>Name: </h3><p>${name}<p>
      <hr>
      <h2>Email Address<h2>
      <h3>Email: </h3><p>${email}</p>
      <hr>
      <h2>Message<h2>
      <p>${message}</p>
      <hr>
      <h2>Phone Number</h2>
      <h3>Phone: </h3>
      ${phone ? `<p>${phone}</p>` : '<p>null</p>'}
      <hr>
      <h2>Organization</h2>
      <h3>Organization: </h3>
      ${organization ? `<p>${organization}</p>` : '<p>null</p>'}
      <hr>
      <h2>IP Location Data:</h2>
      <div class='flex'>
        <div>
          <div class='block'>
            <h3>IP: </h3><p> ${ipLocationData.ip}</p>
          </div>
          <div class='block'>
            <h3>Type: </h3><p> ${ipLocationData.type}</p>
          </div>
          <div class='block'>
            <h3>Country Code: </h3><p> ${ipLocationData.country_code}</p>
          </div>
          <div class='block'>
          <h3>Country Name: </h3><p> ${ipLocationData.country_name}</p>
          </div>
          <div class='block'>
            <h3>Map: </h3>
            ${
              ipLocationData.latitude &&
              ipLocationData.longitude
                ? `<a href='https://www.openstreetmap.org/search?whereami=1&query=${ipLocationData.latitude}%2C${ipLocationData.longitude}#map=16/${ipLocationData.latitude}/${ipLocationData.longitude}' target=_blank rel=noreferrer>
              <p> VIEW ON MAP</p>
            </a>`
                : `<p>null</p>`
            }
          </div>
        </div>
        <div>
          <div class='block'>
            <h3>Region Code: </h3><p> ${ipLocationData.region_code}</p>
          </div>
          <div class='block'>
            <h3>Region Name: </h3><p> ${ipLocationData.region_name} </p>
          </div>
          <div class='block'>
            <h3>City: </h3><p> ${ipLocationData.city}</p>
          </div>
          <div class='block'>
            <h3>Zip Code: </h3><p> ${ipLocationData.zip} </p>
          </div>
          <div class='block'>
            <h3>IP Lat: </h3><p> ${ipLocationData.latitude}</p>
          </div>
          <div class='block'>
            <h3>IP Lon: </h3><p> ${ipLocationData.longitude} </p>
          </div>
        </div>
      </div>
      <hr>
      <h2>GPS Location Data:</h2>
      <div class='flex'>
        <div>
          <div class='block'>
            <h3>Display Name: </h3><p> ${display_name}</p>
          </div>
          <div class='block'>
            <h3>Class: </h3><p> ${locationData.class}</p>
          </div>
          <div class='block'>
            <h3>Type: </h3><p> ${type}</p>
          </div>
          <div class='block'>
            <h3>Address Type:</h3><p> ${addresstype}</p>
          </div>
        </div>
        <div>
          <div class='block'>
            <h3>Road: </h3><p> ${road}</p>
          </div>
          <div class='block'>
            <h3>County: </h3><p> ${county}</p>
          </div>
          <div class='block'>
            <h3>State: </h3><p> ${state}</p>
          </div>
          <div class='block'>
            <h3>Country: </h3><p> ${country}</p>
          </div>
        </div>
      </div>
      <hr>
      <h2>Coordinate Data:</h2>
      <div class='block'>
        <h3>Latitude:</h3><p> ${latitude}</p>
      </div>
      <div class='block'>
        <h3>Longitude: </h3><p> ${longitude}</p>
      </div>
      <div class='block'>
        <h3>Accuracy: </h3><p> ${accuracy}</p>
      </div>
      <div class='block'>
        <h3>Map: </h3>
        ${
          longitude && latitude
            ? `<a href='https://www.openstreetmap.org/search?whereami=1&query=${latitude}%2C${longitude}#map=16/${latitude}/${longitude}' target=_blank rel=noreferrer><p> VIEW ON MAP</p></a>`
            : `<p>null</p>`
        }
      </div>
      <hr>
      <h2>User Agent:</h2>
      <h3>User Agent: </h3>
      <p>${request.headers['user-agent']}</p>
      <hr>
    </body>
  </html>
  `;
};

export default createHtmlEmailMessage;
