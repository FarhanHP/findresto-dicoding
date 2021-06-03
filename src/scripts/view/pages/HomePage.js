import RestaurantsRequest from '../../utils/request/restaurants-request';
import Page from '../abstracts/Page';
import jumbotronImageLarge from '../../../public/images/heros/hero-image_1-large.jpg';
import jumbotronImageMedium from '../../../public/images/heros/hero-image_1-medium.jpg';
import jumbotronImageSmall from '../../../public/images/heros/hero-image_1-small.jpg';

class HomePage extends Page {
  constructor(parentElement) {
    super(
      parentElement,
      {
        dataLoading: true,
        restaurants: [],
        search: '',
      },
    );

    this.searchHandler = this.searchHandler.bind(this);
    this.initSiteJumbotron = this.initSiteJumbotron.bind(this);
  }

  render() {
    const { search, restaurants } = this.state;

    this.parentElement.innerHTML = `
      <site-jumbotron>
      </site-jumbotron>

      <article
        id="maincontent"
        class="restaurant-list-container"
        tabindex="0"
      >
        <h1
          tabindex="0"
          class="restaurant-list__h1"
        >
          Explore Restaurants
        </h1>

        <div
          class="searchbar-container"
        >
          <search-bar></search-bar>
        </div>

        ${search.length > 0 ? `
          <p
            class="search-information"
          >
            ${restaurants.length} results for <b>${search}</b> :
          </p>
        ` : ''}

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
    this.siteJumbotron = document.querySelector('site-jumbotron');
    this.initSiteJumbotron();
    this.initSearchBar();

    if (this.state.dataLoading) {
      this.getAllRestaurants();
      this.renderLoadingElement();
    } else {
      this.renderRestaurantsList();
    }
  }

  initSiteJumbotron() {
    const caption = '#1 Restaurants Finding Site';
    this.siteJumbotron.init({
      smallImage: jumbotronImageSmall,
      mediumImage: jumbotronImageMedium,
      largeImage: jumbotronImageLarge,
      caption,
    });
  }

  initSearchBar() {
    this.searchBar = document.querySelector('search-bar');
    this.searchBar.init({
      onSubmit: this.searchHandler,
      placeholder: 'Search restaurants here...',
      defaultValue: this.state.search,
    });
  }

  async getAllRestaurants() {
    const res = await RestaurantsRequest.getAllRestaurants();
    if (res.ok) {
      const jsonData = await res.json();
      this.setState({
        restaurants: jsonData.restaurants,
        dataLoading: false,
      });
    } else {
      this.setState({
        dataLoading: false,
      });
    }
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

  async searchHandler(value) {
    this.setState({
      search: value,
      restaurants: [],
      dataLoading: true,
    });

    const res = await RestaurantsRequest.searchRestaurants(value);

    if (res.ok) {
      const dataJson = await res.json();
      this.setState({
        restaurants: dataJson.restaurants,
        dataLoading: false,
      });
    } else {
      this.setState({
        dataLoading: false,
      });
    }
  }
}

export default HomePage;
