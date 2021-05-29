import StatefulElement from '../abstracts/StatefulElement';

class ReviewsElement extends StatefulElement {
  constructor() {
    super({
      customerReviews: [],
      restaurant: {},
    });

    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
  }

  init({
    restaurantsRequest, restaurant,
  }) {
    this.restaurantsRequest = restaurantsRequest;
    const { customerReviews } = restaurant;
    this.setState({
      customerReviews,
      restaurant,
    });
  }

  render() {
    this.innerHTML = `
      <div
        class="restaurant-page__section restaurant-page__reviews"
      >
        <h2
          class="restaurant-page__h2"
          tabindex="0"
        >
          Write a Review
        </h2>

        <review-form>
        </review-form>

        <h2
          class="restaurant-page__h2"
          tabindex="0"
        >
          Reviews
        </h2>

        <review-card-container>
        </review-card-container>
      </div>
    `;

    this.initRestaurantReviews();
    this.initReviewForm();
  }

  initReviewForm() {
    const reviewForm = document.querySelector('review-form');
    reviewForm.init(this.handleReviewSubmit);
  }

  async handleReviewSubmit(name, review) {
    const { restaurantsRequest, state } = this;
    const { id } = state.restaurant;
    const res = await restaurantsRequest.postReview(id, name, review);
    if (res.ok) {
      const { customerReviews } = await res.json();
      this.setState({
        customerReviews,
      });
      return true;
    }
    return false;
  }

  initRestaurantReviews() {
    const reviewContainer = document.querySelector('review-card-container');
    reviewContainer.init(this.state.customerReviews);
  }
}

customElements.define('reviews-element', ReviewsElement);
