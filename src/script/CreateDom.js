const CreateDOM = (type) => {
  const element = document.createElement(type);
  const getElement = () => element;
  const setElementAttribute = (attributes) => {
    const { name, values } = attributes;
    values.forEach((value) => {
      if (name !== 'class') element.setAttribute(name, value);
      else element.classList.add(value);
    });
  };

  return { getElement, setElementAttribute };
};

export default CreateDOM;
