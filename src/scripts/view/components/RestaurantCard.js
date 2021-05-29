import RestaurantsRequest from '../../utils/request/restaurants-request';
import StatelessElement from '../abstracts/StatelessElement';

class RestaurantCard extends StatelessElement {
  constructor() {
    super();
    this.restaurant = null;
  }

  setRestaurant(restaurant) {
    this.restaurant = restaurant;
    this.render();
  }

  render() {
    const {
      id, name, description, pictureId, city, rating,
    } = this.restaurant;
    const restaurantLink = `/#/restaurant/${id}`;

    this.innerHTML = `
      <div
        class="restaurant-card"
      >
        <a
          href="${restaurantLink}"
          class="restaurant-card__image-container"
        >
          <image
            class="restaurant-card__image lazyload"
            alt="${name}'s image"
            data-src="${RestaurantsRequest.getRestaurantSmallImageUrl(pictureId)}"
          />
          <p
            class="restaurant-card__city"
          >
            ${city}
          </p>
        </a>

        <div
          class="restaurant-card__information"
        >
          <a
            href="${restaurantLink}"
          >
            <h2
              class="restaurant-card__name"
            >
              ${name}
            </h2>
          </a>

          <expandable-text
            key="${id}"
            text="${description}"
          ></expandable-text>

          <p
            class="restaurant-card__rating"
          >
            <span
              class="restaurant-card__rating__number"
            >
              Rating: ${rating}
            </span>

            <i
              class="material-icons restaurant-card__rating__star"
            >
              star_rate
            </i>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-card', RestaurantCard);
