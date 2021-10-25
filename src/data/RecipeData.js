const RecipeData = () => {
  let todayRecipeDataState = [];
  let selectedRecipeDataState = [];
  let allRecipeDataState = [];

  const getData = () => ({
    todayRecipeDataState,
    selectedRecipeDataState,
    allRecipeDataState,
  });

  const setState = async (category, fetchedData) => {
    try {
      const newState = [];
      await fetchedData.forEach((data) => {
        newState.push(data);
      });

      if (category === 'selected') {
        selectedRecipeDataState = newState;
      } else if (category === 'today') {
        todayRecipeDataState = newState;
      } else if (category === 'all') {
        allRecipeDataState = newState;
      }

      return getData()[`${category}RecipeDataState`];
    } catch (error) {
      return error;
    }
  };

  return {
    getData,
    setState,
  };
};

const recipeData = RecipeData();

export default recipeData;
