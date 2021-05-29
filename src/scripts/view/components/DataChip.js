import StatelessElement from '../abstracts/StatelessElement';

class DataChip extends StatelessElement {
  constructor() {
    super();

    this.text = this.getAttribute('text') || '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div
        class="chip"
      >
        ${this.text}
      </div>
    `;
  }
}

customElements.define('data-chip', DataChip);
