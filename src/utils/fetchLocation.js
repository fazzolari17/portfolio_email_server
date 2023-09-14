import axios from 'axios';



const fetchLocation = async (locationData) => {
  const { latitude, longitude } = locationData

  const locationUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  const response = await axios.get(locationUrl);
  return response.data;
}

fetchLocation({
  latitude: '35.35939463930854',
  longitude: '-83.18127853209337',
  accuracy: '92156.8580177972',
});
export default fetchLocation;