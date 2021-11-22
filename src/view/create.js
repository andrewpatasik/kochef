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
          <label for="" class="text-sm text-green-800">Bahan baku</label>
            <div id="ingredient-component" class="flex flex-col mt-1">
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
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
          <div class="relative flex justify-center my-6">
            <button id="ingredient-counter" class="bg-blue-500 text-sm text-gray-100 p-2 w-auto rounded-md">Tambah Bahan</button>
          </div>         
        </form>
     </section> 
    `;
  }
}

customElements.define('create-element', Create);
