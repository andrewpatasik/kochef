/* eslint-disable no-underscore-dangle */
import fakeCategory from '../data/fakeCategory.json';
import useState from '../data/useState';

class CategoryComponent extends HTMLElement {
  connectedCallback() {
    const [getCategoryState, setCategoryState] = useState();

    this.classList.add('w-full');
    this.classList.add('h-20');
    this.classList.add('mt-2');
    this.classList.add('mb-4');
    this.classList.add('flex');
    this.classList.add('flex-nowrap');
    this.classList.add('overflow-auto');
    this.classList.add('no-scrollbar');

    setCategoryState(fakeCategory);
    this.categoryData = getCategoryState();
    this.render();
  }

  render() {
    this.innerHTML = '';

    this.categoryData.forEach((data) => {
      const { category, key } = data;
      const cardContainer = document.createElement('a');
      cardContainer.setAttribute('href', '#');
      cardContainer.setAttribute('id', key);
      cardContainer.classList.add('flex');
      cardContainer.classList.add('flex-col');
      cardContainer.classList.add('justify-center');
      cardContainer.classList.add('items-center');
      cardContainer.classList.add('flex-shrink-0');
      cardContainer.classList.add('bg-green-200');
      cardContainer.classList.add('h-16');
      cardContainer.classList.add('m-1');
      cardContainer.classList.add('p-2');
      cardContainer.classList.add('rounded-md');
      cardContainer.classList.add('shadow-md');
      cardContainer.innerHTML = `
        <img src="./assets/${key}.svg" alt="category_${key}" class="w-8 h-8" />
        <p class="text-xs flex-grow">${category}</p>
      `;
      this.appendChild(cardContainer);

      cardContainer.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(key);
      });
    });
  }
}

customElements.define('category-component', CategoryComponent);
