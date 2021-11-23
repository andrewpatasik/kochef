class IngredientComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="ingredient-component" class="flex flex-col mb-2">
        <div class="flex items-center gap-1">
          <input id="ingredient-count" type="text" class="flex-initial w-1/5 bg-white border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 text-sm text-gray-800 p-1"/>
          <select id="ingredient-metric" class="flex-initial w-2/6 bg-white border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 text-xs text-gray-800 p-1">
            <option>ml</option>
            <option>liter</option>
            <option>gram</option>
            <option>miligram</option>
          </select>
          <input id="ingredient-material" type="text" class="flex-1 w-auto bg-white border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 text-sm text-gray-800 p-1"/>
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
