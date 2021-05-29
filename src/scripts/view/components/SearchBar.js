import StatelessElement from '../abstracts/StatelessElement';

class SearchBar extends StatelessElement {
  init({
    onSubmit, placeholder, defaultValue,
  }) {
    this.onSubmit = onSubmit;
    this.placeholder = placeholder;
    this.defaultValue = defaultValue;
    this.handleSubmit = this.handleSubmit.bind(this);

    this.render();
  }

  render() {
    this.innerHTML = `
      <input
        class="searchbar__input"
        placeholder="${this.placeholder}"
        value="${this.defaultValue}"
      />

      <button
        class="searchbar-btn"
      >
        <span class="material-icons">
          search
        </span>
      </button>
    `;

    document.querySelector('.searchbar-btn').addEventListener('click', this.handleSubmit);
    document.querySelector('.searchbar__input').addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.handleSubmit();
      }
    });
  }

  handleSubmit() {
    const { value } = document.querySelector('.searchbar__input');
    this.onSubmit(value);
  }
}

customElements.define('search-bar', SearchBar);
