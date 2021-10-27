const searchResultsData = () => {
  let searchResultState = [];

  const getData = () => searchResultState;

  const setState = async (fetchedData) => {
    try {
      const newState = [];
      await fetchedData.forEach((data) => {
        newState.push(data);
      });

      searchResultState = newState;

      return getData();
    } catch (error) {
      return error;
    }
  };

  return {
    getData,
    setState,
  };
};

const searchResult = searchResultsData();

export default searchResult;
