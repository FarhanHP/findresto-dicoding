import StatelessElement from '../abstracts/StatelessElement';

class ReviewCardContainer extends StatelessElement {
  constructor() {
    super();

    this.key = this.getAttribute('key') || Math.floor(Math.random() * 1000);
    this.ulId = `review-card-container-${this.key}`;
    this.reviews = [];
  }

  init(reviews) {
    this.reviews = reviews;

    this.render();
  }

  render() {
    this.innerHTML = `
      <ul
        id="${this.ulId}"
        class="no-list-bullet"
      >
      </ul>
    `;

    this.initReviews();
  }

  initReviews() {
    const ul = document.querySelector(`#${this.ulId}`);
    this.reviews.forEach((reviewObj) => {
      const { name, review, date } = reviewObj;

      ul.innerHTML += `
        <li>
          <review-card
            name="${name}"
            date="${date}"
            review="${review}"
          >
          </review-card>
        </li>
      `;
    });
  }
}

customElements.define('review-card-container', ReviewCardContainer);
