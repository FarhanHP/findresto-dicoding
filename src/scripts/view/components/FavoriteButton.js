import StatefulElement from '../abstracts/StatefulElement';

class FavoriteButton extends StatefulElement {
  constructor() {
    super({
      loading: false,
    });

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  init(isFavorite, onClick) {
    this.isFavorite = isFavorite;
    this.onClick = onClick;
    this.buttonId = `favorite-btn-${this.key}`;

    this.render();
  }

  render() {
    const { loading } = this.state;
    const { isFavorite } = this;

    this.innerHTML = `
      <button
        id="${this.buttonId}"
        class="favorite-btn"
        aria-label="${isFavorite ? 'remove favorite' : 'add favorite'}"
        ${loading ? 'disabled' : ''}
      >
        <span
          class="favorite-btn__desc"
        >
          ${isFavorite ? `
            ${loading ? 'REMOVING FAVORITE...' : 'REMOVE FAVORITE'}
          ` : `
            ${loading ? 'ADDING FAVORITE...' : 'ADD FAVORITE'}
          `}
        </span>

        <i
          class="material-icons favorite-btn__icon"
        >
          ${isFavorite ? 'star' : 'star_outline'}
        </i>
      </button>
    `;

    const button = document.querySelector(`#${this.buttonId}`);
    if (button) {
      button.addEventListener('click', this.onClickHandler);
    }
  }

  async onClickHandler() {
    this.setState({
      loading: true,
    });

    await this.onClick();

    this.setState({
      loading: false,
    });
  }
}

customElements.define('favorite-button', FavoriteButton);
