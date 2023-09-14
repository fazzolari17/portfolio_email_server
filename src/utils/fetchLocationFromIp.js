import axios from "axios";

const fetchLocationFromIp = async (data) => {

  const uri = `http://api.ipapi.com/api/${data}?access_key=${process.env.IP_LOOKUP_API_KEY}`
  const response = await axios.get(uri);

  return response.data;

}

export default fetchLocationFromIp;