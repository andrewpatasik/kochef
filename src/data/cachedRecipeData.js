const cacheRecipeData = (data, options) => {
  const { storageName, category } = options;
  const cached = JSON.parse(localStorage.getItem(storageName));
  localStorage.setItem(storageName, JSON.stringify({ ...cached, [category]: data }));
};

export default cacheRecipeData;
