const RecipeDetailsData = () => {
  let recipeDetailsDataState = {};

  const getData = () => ({
    recipeDetailsDataState,
  });

  const setState = async (fetchedData) => {
    try {
      const newState = [];
      await fetchedData.forEach((data) => {
        newState.push(data);
      });

      recipeDetailsDataState = { ...newState[0] };

      return getData().recipeDetailsDataState;
    } catch (error) {
      return error;
    }
  };

  return {
    getData,
    setState,
  };
};

const recipeDetailsData = RecipeDetailsData();

export default recipeDetailsData;
