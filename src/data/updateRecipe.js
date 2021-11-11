const updateRecipe = (category, updatedData) => {
  if (window.localStorage) {
    const cached = JSON.parse(window.localStorage.getItem('userCache'));
    if (!window.localStorage.getItem('userCache')) return 'no data to delete';
    window.localStorage.setItem('userCache', JSON.stringify({ ...cached, [category]: updatedData }));
    return 'recipe has been deleted';
  }
  return 'window localstorage not found';
};

export default updateRecipe;
