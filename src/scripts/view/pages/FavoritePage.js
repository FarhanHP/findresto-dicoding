import FavoriteRestaurantIdb from '../../utils/database/favorite-restaurant-idb';
import Page from '../abstracts/Page';

class FavoritePage extends Page {
  constructor(parentElement) {
    super(
      parentElement,
      {
        dataLoading: true,
        restaurants: [],
      },
    );
  }

  render() {
    this.parentElement.innerHTML = `
      <article
        id="maincontent"
        class="restaurant-list-container"
        tabindex="0"
      >
        <h1
          tabindex="0"
          class="favorite-page__h1"
        >
          Favorite Restaurants
        </h1>

        <div
          id="content"
          class="page-content"
        >
        
        </div>
      </article>
    `;

    this.afterRender();
  }

  afterRender() {
    this.contentElement = document.querySelector('#content');
    if (this.state.dataLoading) {
      this.getAllRestaurants();
      this.renderLoadingElement();
    } else {
      this.renderRestaurantsList();
    }
  }

  async getAllRestaurants() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    this.setState({
      dataLoading: false,
      restaurants,
    });
  }

  renderLoadingElement() {
    this.contentElement.innerHTML = `
      <p
        class="loading-information"
      >
        Loading Content...
      </p>
    `;
  }

  renderRestaurantsList() {
    this.contentElement.innerHTML = `
      <restaurants-list
        id="restaurants-list1"
        class="restaurants-list"
      >
      </restaurants-list>
    `;
    const restaurantsList = document.querySelector('#restaurants-list1');
    restaurantsList.setRestaurants(this.state.restaurants);
  }
}

export default FavoritePage;
