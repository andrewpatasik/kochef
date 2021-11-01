const saveRecipe = (data, opt) => {
  const { caches } = opt;
  if (window.localStorage) {
    if (!window.localStorage.getItem('savedRecipe')) {
      window.localStorage.setItem('savedRecipe', JSON.stringify([]));
    }
    const recipeData = JSON.parse(window.localStorage.getItem('savedRecipe'));
    if (recipeData.some((recipe) => recipe.key === data.key)) {
      console.log('recipe already saved');
      return;
    }
    const newRecipeData = [...recipeData, data];
    window.localStorage.setItem('savedRecipe', JSON.stringify(newRecipeData));
    console.log('recipe saved');
  }
};

export default saveRecipe;
