const updateRecipe = (updatedData) => {
  if (window.localStorage) {
    if (!window.localStorage.getItem('savedRecipe')) return 'no data to delete';
    window.localStorage.setItem('savedRecipe', JSON.stringify([...updatedData]));
    return 'recipe has been deleted';
  }
  return 'window localstorage not found';
};

export default updateRecipe;
