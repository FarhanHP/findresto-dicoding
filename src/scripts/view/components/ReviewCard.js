import StatelessElement from '../abstracts/StatelessElement';

class ReviewCard extends StatelessElement {
  constructor() {
    super();

    this.name = this.getAttribute('name') || null;
    this.date = this.getAttribute('date') || null;
    this.review = this.getAttribute('review') || null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div
        class="review-card"
        tabindex="0"
      >
        <div
          class="review-card__head"
        >
          <p>
            <b>${this.name}</b>
          </p>

          <p
            class="review-card__date"
          >
            ${this.date}
          </p>
        </div>

        <expandable-text
          text="${this.review}"
        >
        </expandable-text>
      </div>
    `;
  }
}

customElements.define('review-card', ReviewCard);
