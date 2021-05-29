import UrlParser from '../../routes/url-parser';
import FavoriteRestaurantIdb from '../../utils/database/favorite-restaurant-idb';
import RestaurantsRequest from '../../utils/request/restaurants-request';
import WINDOW_SIZES from '../../const/window_sizes';
import Page from '../abstracts/Page';

class RestaurantPage extends Page {
  constructor(parentElement) {
    super(
      parentElement,
      {
        restaurant: null,
        customerReviews: [],
        loadingData: true,
      },
    );

    this.smallImageUrl = '';
    this.mediumImageUrl = '';
    this.largeImageUrl = '';
    this.getRestaurant();
  }

  render() {
    const { loadingData, restaurant } = this.state;

    if (loadingData) {
      this.renderLoadingElement();
    } else if (restaurant) {
      this.renderRestaurant();
    } else {
      this.renderEmptyRestaurant();
    }
  }

  renderLoadingElement() {
    this.parentElement.innerHTML = `
      <div
        class="information-section"
      >
        <p
          class="loading-information"
        >
          Loading Content...
        </p>
      </div>
    `;
  }

  renderEmptyRestaurant() {
    this.parentElement.innerHTML = `
      <div
        class="information-section"
      >
        <p
          class="empty-information"
          tabindex="0"
        >
          The restaurant you are looking for is not available :(
        </p>
      </div>
    `;
  }

  renderRestaurant() {
    const { restaurant } = this.state;
    const { id } = restaurant;
    this.categoriesId = `categories-${id}`;
    this.foodsId = `foods-${id}`;
    this.drinksId = `drinks-${id}`;
    const {
      smallImageUrl, mediumImageUrl, largeImageUrl, parentElement,
    } = this;

    parentElement.innerHTML = `
      <article
        id="maincontent"
        class="restaurant-page"
        tabindex="0"
      >
        <restaurant-element>
        </restaurant-element>

        <reviews-element>
        </reviews-element>
      </article>
    `;

    const restaurantElement = document.querySelector('restaurant-element');
    restaurantElement.init({
      restaurant,
      windowSize: WINDOW_SIZES,
      favoriteRestaurantDb: FavoriteRestaurantIdb,
      smallImage: smallImageUrl,
      mediumImage: mediumImageUrl,
      largeImage: largeImageUrl,
    });

    const reviewsElement = document.querySelector('reviews-element');
    reviewsElement.init({
      restaurantsRequest: RestaurantsRequest,
      restaurant,
    });
  }

  async getRestaurant() {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    const res = await RestaurantsRequest.getRestaurantDetail(id);

    if (res.ok) {
      const { restaurant } = await res.json();
      const { pictureId } = restaurant;
      this.smallImageUrl = RestaurantsRequest.getRestaurantSmallImageUrl(pictureId);
      this.mediumImageUrl = RestaurantsRequest.getRestaurantMediumImageUrl(pictureId);
      this.largeImageUrl = RestaurantsRequest.getRestaurantLargeImageUrl(pictureId);
      this.setState({
        restaurant,
        loadingData: false,
      });
    } else {
      this.setState({
        loadingData: false,
      });
    }
  }
}

export default RestaurantPage;
