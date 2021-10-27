class LoadingIndicatorComponent extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('items-center');
    this.classList.add('justify-center');
    this.classList.add('p-4');
    this.classList.add('w-full');
    this.classList.add('h-14');

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="loader w-12 h-12 rounded-full border-8 border-t-8 border-gray-300 animate-spin"></div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicatorComponent);
