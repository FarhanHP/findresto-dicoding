import StatelessElement from '../abstracts/StatelessElement';

class RestaurantsList extends StatelessElement {
  constructor() {
    super();
    this.restaurants = [];
  }

  setRestaurants(restaurants) {
    this.restaurants = restaurants;
    this.render();
  }

  render() {
    if (this.restaurants.length > 0) {
      this.restaurants.forEach((restaurant) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.setRestaurant(restaurant);
        this.appendChild(restaurantCard);
      });
    } else {
      this.innerHTML = `
        <p
          class="no-restaurants"
        >
          No Restaurants :(
        </p>
      `;
    }
  }
}

customElements.define('restaurants-list', RestaurantsList);
