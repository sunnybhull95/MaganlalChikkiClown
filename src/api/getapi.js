import axios from "axios";

async function getAPI(url) {
  axios.defaults.baseURL = "https://appy.trycatchtech.com/v3/maganlalchikki/";

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw error;
  }
}

export default getAPI;
