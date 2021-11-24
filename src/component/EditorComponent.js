import Quill from 'quill';

class EditorComponent extends HTMLElement {
  connectedCallback() {
    this.setAttribute('id', 'editor');
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('flex-1');

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
    // eslint-disable-next-line no-unused-vars
    const quill = new Quill('#editor', options);
  }
}

customElements.define('editor-element', EditorComponent);
