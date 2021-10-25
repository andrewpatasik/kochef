const cacheRecipeData = (category, data) => {
  const cached = JSON.parse(localStorage.getItem('userRecipeData'));
  localStorage.setItem('userRecipeData', JSON.stringify({ ...cached, [category]: data }));
};

export default cacheRecipeData;
