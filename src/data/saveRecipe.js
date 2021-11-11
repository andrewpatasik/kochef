const saveRecipe = (data, opt) => {
  // caches option is for firebase storage (not implemented yet)
  // eslint-disable-next-line no-unused-vars
  const { caches } = opt;
  if (window.localStorage) {
    const cached = JSON.parse(window.localStorage.getItem('userCache'));
    const userSavedRecipe = JSON.parse(window.localStorage.getItem('userCache')).saved;
    if (userSavedRecipe.some((recipe) => recipe.key === data.key)) {
      console.log('recipe already saved');
      return;
    }
    const newRecipeData = [...userSavedRecipe, data];

    window.localStorage.setItem('userCache', JSON.stringify({ ...cached, saved: newRecipeData }));
    console.log('recipe saved');
  }
};

export default saveRecipe;
