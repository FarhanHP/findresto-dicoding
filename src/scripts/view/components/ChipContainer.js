import StatelessElement from '../abstracts/StatelessElement';

class ChipContainer extends StatelessElement {
  init(texts) {
    this.texts = texts;
    this.render();
  }

  render() {
    const id = `chip-container-${this.key}`;

    this.innerHTML = `
      <ul
        class="chip-container"
        id="${id}"
      >
      </ul>
    `;

    const chipContainer = document.querySelector(`#${id}`);

    this.texts.forEach((text) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <data-chip
          text="${text}"
        >
        </data-chip>
      `;

      chipContainer.appendChild(li);
    });
  }
}

customElements.define('chip-container', ChipContainer);
