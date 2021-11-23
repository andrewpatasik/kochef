import '../component/NavbarComponent';

class Create extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('pt-16');
    this.classList.add('min-h-screen');
    this.render();
  }

  render() {
    this.innerHTML = `
      <navbar-component></navbar-component>
      <section id="form-component" class="w-full p-4">
        <h2>Buat Resep Baru</h2>
        <form class="border-sm border-gray-400 mt-2">
          <div class="flex flex-col">
            <label for="" class="text-sm text-green-800">Nama resep</label>
            <input class="bg-white border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 my-2 p-1 text-sm text-gray-800 my-2 p-1" type="text"/>
          </div>
          <section id="ingredient-container">
          <div class="flex justify-between border-b-2 pb-1 mb-4">
            <label for="" class="text-sm text-green-800">Bahan baku</label>
            <button id="ingredient-counter" class="flex items-center text-sm text-blue-500 w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            </button>
          </div>
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
 
          </section>
        </form>
     </section> 
    `;
  }
}

customElements.define('create-element', Create);
