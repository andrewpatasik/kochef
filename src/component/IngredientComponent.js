class IngredientComponent extends HTMLElement {
  connectedCallback() {
    this.render();

    this.querySelector('#ingredient-action-container').addEventListener('click', () => {
      this.remove();
    });
  }

  render() {
    this.innerHTML = `
      <div id="ingredient-component" class="flex flex-col mb-2">
        <div class="flex items-center gap-2">
          <input id="ingredient-material" type="text" class="flex-1 w-auto bg-white border-b-2 border-gray-200 focus:outline-none focus:border-green-200 text-sm text-gray-800 p-1" placeholder="tuliskan bahan baku disini..."/>
          <div id="ingredient-action-container" class="text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
            </svg> 
          </div>
        </div>
      </div> 
    `;
  }
}

customElements.define('ingredient-element', IngredientComponent);
