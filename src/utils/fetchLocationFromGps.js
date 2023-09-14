import axios from 'axios';



const fetchLocationFromGps = async (locationData) => {
  const { latitude, longitude } = locationData

  const locationUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  const response = await axios.get(locationUrl);
  return response.data;
}


export default fetchLocationFromGps;