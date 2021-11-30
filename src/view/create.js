import '../component/NavbarComponent';
import '../component/EditorComponent';
import Quill from 'quill';
import cacheRecipeData from '../data/cachedRecipeData';

class Create extends HTMLElement {
  constructor() {
    super();

    document.title = 'Kochef - Create Recipe';
  }

  addNewIngredientElement(e) {
    e.preventDefault();
    import('../component/IngredientComponent')
      .then(() => {
        const ingredientElement = document.createElement('ingredient-element');
        this.querySelector('#list-container').appendChild(ingredientElement);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  recipeImageSelector(uploaderElement, displayContainer) {
    const imagePreviewElement = displayContainer;
    const [file] = uploaderElement.files;
    if (file) {
      imagePreviewElement.classList.toggle('hidden');
      imagePreviewElement.src = URL.createObjectURL(file);
    } else {
      imagePreviewElement.src = '#';
      imagePreviewElement.classList.toggle('hidden');
    }
  }

  submitRecipeEventHandler(e, quill) {
    e.preventDefault();

    const title = this.querySelector('#recipe-name').value;
    const key = title.toLowerCase()
      .split(' ')
      .join('-');
    const [file] = this.querySelector('#recipe-image-uploader').files;
    const imgBlob = file ? URL.createObjectURL(file) : null;
    const ingredientContainer = this.querySelector('#list-container');
    const ingredientElements = ingredientContainer.querySelectorAll('#ingredient-material');
    const ingredientArray = Array.from(ingredientElements).map((ingredient) => ingredient.value);
    const instruction = quill.getContents();

    const newRecipe = {
      key,
      title,
      thumb: imgBlob,
      ingredients: ingredientArray,
      instruction: instruction.ops[0].insert,
    };
    console.log(newRecipe);

    // cacheRecipeData(newRecipe, {
    //   storageName: 'userCache',
    //   category: 'created',
    // });

    console.log('recipe submitted');
  }

  // eslint-disable-next-line class-methods-use-this
  initQuill() {
    const options = {
      modules: {
        toolbar: [
          // eslint-disable-next-line quote-props
          [{ 'header': [2, 3, false] }],
          ['bold', 'italic'],
        ],
      },
      placeholder: 'Tuliskan langkah-langkah resep disini...',
      theme: 'snow',
    };

    const quill = new Quill('#editor', options);

    return quill;
  }

  disconnectedCallback() {
    this.querySelector('#ingredient-list-counter')
      .removeEventListener('click', (e) => this.addNewIngredientElement(e));
  }

  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('pt-16');
    this.classList.add('min-h-screen');

    this.render();

    this.querySelector('#ingredient-list-counter')
      .addEventListener('click', (e) => this.addNewIngredientElement(e));

    this.querySelector('#recipe-image-uploader')
      .addEventListener('change', () => this.recipeImageSelector(this.querySelector('#recipe-image-uploader'),
        this.querySelector('#recipe-image-preview')));

    const quill = this.initQuill();

    this.querySelector('#submit-btn').addEventListener('click', (e) => this.submitRecipeEventHandler(e, quill));
  }

  render() {
    this.innerHTML = `
      <navbar-component></navbar-component>
      <section id="form-component" class="flex flex-col flex-1 p-4">
        <h2>Resep Baru</h2>
        <form class="flex flex-col flex-1 h-full border-sm border-gray-400 mt-2">
          <section id="recipe-title-container" class="flex flex-col mb-2">
            <label for="" class="text-sm text-green-800">Nama resep</label>
            <input id="recipe-name" class="bg-white border-b-2 border-gray-200 focus:outline-none focus:border-green-200 my-1 p-1 text-sm text-gray-800 p-1" type="text" placeholder="tuliskan nama resep disini..."/>
          </section>
          <section id="recipe-image-container" class="w-full flex flex-col mb-2">
            <label for="" class="text-sm text-green-800">Foto Masakan</div>
            <div class="flex flex-col flex-1 border-2 my-1 p-1">
              <input type="file" id="recipe-image-uploader" name="recipe-image" accept="image/png, image/jpeg, image/webp" class="text-sm">
              <img id="recipe-image-preview" src="#" alt="recipe-image-preview" class="text-sm hidden"/>
            </div>
          </section>
          <section id="recipe-ingredient-container" class="flex flex-col">
            <div class="flex justify-between pb-1 mb-2">
              <label for="" class="text-sm text-green-800">Bahan baku</label>
              <button id="ingredient-list-counter" class="flex items-center text-sm text-blue-500 w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>          
          </section>
          <div id="list-container" class="w-full h-32 border-b-2 mb-2 overflow-auto no-scrollbar">
          </div>
          <section id="recipe-step-container" class="flex flex-col flex-1">
            <label for="" class="text-sm text-green-800">Instruksi Memasak</label>
            <editor-element></editor-element> 
          </section>
          <div class="flex justify-end pt-2">
            <button id="submit-btn" class="bg-blue-500 p-2 w-auto h-auto rounded-md text-sm text-white">Simpan</button>
          </div>
        </form>
     </section>
    `;
  }
}

customElements.define('create-element', Create);
