const RecipeCategory = () => {
  let recipeCategoryState = [];

  const getData = () => recipeCategoryState;

  const setState = async (fetchedData) => {
    try {
      const newState = [];
      await fetchedData.forEach((data) => {
        newState.push(data);
      });

      recipeCategoryState = newState;

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

const recipeCategory = RecipeCategory();

export default recipeCategory;
