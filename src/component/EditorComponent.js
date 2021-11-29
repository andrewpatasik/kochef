class EditorComponent extends HTMLElement {
  connectedCallback() {
    this.setAttribute('id', 'editor');
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('flex-1');
  }
}

customElements.define('editor-element', EditorComponent);
