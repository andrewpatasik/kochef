import axios from 'axios';

const fetchUserData = async (endpoint) => {
  try {
    const BASE_URL = 'https://randomuser.me/api/';

    const response = await axios.get(`${BASE_URL + endpoint}`);
    if (response.status !== 200) {
      return response.status;
    }

    const { data } = response;
    return data.results;
  } catch (error) {
    return `something not right: error ${error}`;
  }
};

export default fetchUserData;
