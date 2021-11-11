import axios from 'axios';

const fetchRecipes = async (endpoint) => {
  try {
    // const PROXY_URL = 'https://cors.bridged.cc/';
    const BASE_URL = 'https://masak-apa.tomorisakura.vercel.app';

    const response = await axios.get(`${BASE_URL + endpoint}`);
    if (response.status !== 200) {
      return response.status;
    }

    const { data } = response;
    return data.results;
  } catch (error) {
    console.log(`something not right: ${error}`);
    return [];
  }
};

export default fetchRecipes;

// https://randomuser.me/api/?exc=login, gender, dob, registered
