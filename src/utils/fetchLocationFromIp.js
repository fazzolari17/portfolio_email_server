import axios from "axios";

const fetchLocationFromIp = async (data) => {

  const uri = `http://api.ipapi.com/api/${data}?access_key=${process.env.IP_LOOKUP_API_KEY}`

  const { ip, type, country_code, country_name, region_code, region_name, city, zip, latitude, longitude } = await axios.get(uri);
  const response = await axios.get(uri);

  console.log(response);
  return {
    ip,
    type,
    country_code,
    country_name,
    region_code,
    region_name,
    city,
    zip,
    latitude,
    longitude,
  };

}

export default fetchLocationFromIp;