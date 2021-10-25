class EmptyPage extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('w-full');
    this.classList.add('h-screen');
    this.classList.add('justify-center');
    this.classList.add('items-center');
    this.classList.add('text-center');

    this.render();
  }

  render() {
    this.innerHTML = '';

    this.innerHTML = `
      <h1 class=" text-5xl mb-4 w-auto">404</h1>
      <h4 class="w-1/2">Oops...looks like the page is empty</h4>
    `;
  }
}

customElements.define('not-found', EmptyPage);
