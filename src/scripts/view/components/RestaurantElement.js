import StatefulElement from '../abstracts/StatefulElement';

class RestaurantElement extends StatefulElement {
  constructor() {
    super({
      restaurant: null,
      isFavorite: false,
    });

    this.categoriesId = '';
    this.foodsId = '';
    this.drinksId = '';

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  async init({
    restaurant, windowSize, favoriteRestaurantDb, smallImage, mediumImage, largeImage,
  }) {
    this.windowSize = windowSize;
    this.favoriteRestaurantDb = favoriteRestaurantDb;
    this.smallImage = smallImage;
    this.mediumImage = mediumImage;
    this.largeImage = largeImage;
    const { id } = restaurant;
    const isFavorite = !!(await favoriteRestaurantDb.getRestaurant(id));
    this.categoriesId = `categories-${id}`;
    this.foodsId = `foods-${id}`;
    this.drinksId = `drinks-${id}`;

    this.setState({
      restaurant,
      isFavorite,
    });
  }

  render() {
    const { LARGE, SMALL } = this.windowSize;
    const {
      name, description, address, city, rating,
    } = this.state.restaurant;
    const smallImageUrl = this.smallImage;
    const mediumImageUrl = this.mediumImage;
    const largeImageUrl = this.largeImage;

    this.innerHTML = `
      <div
        class="restaurant-page__non-reviews"
      >
        <div
          class="restaurant-page__image-container"
        >
          <picture>
            <source media="(min-width: ${LARGE.min}px)" srcset="${largeImageUrl}" type="image/jpeg">
            <source media="(min-width: ${SMALL.min}px)" srcset="${mediumImageUrl}" type="image/jpeg">
            <image
              src="${smallImageUrl}"
              alt="${name}'s pic"
              class="restaurant-page__image"
            />
          </picture>
        </div>

        <div
          class="restaurant-page__body"
        >
          <h1
            tabindex=0
            class="restaurant-page__h1"
          >
            ${name}
          </h1>

          <div
            class="restaurant-page__favorite-btn-container"
          >
            <favorite-button>
            </favorite-button>
          </div>

          <div
            class="restaurant-page__section"
          >
            <expandable-text
              text="${description}"
            >
            </expandable-text>

            <p
              class="restaurant-page__info"
            >
              <i
                class="material-icons restaurant-page__info__icon"
              >
                location_on
              </i>

              <span>
                ${address}, ${city}
              </span>
            </p>

            <p
              class="restaurant-page__info"
            >
              <i
                class="material-icons restaurant-page__info__icon"
              >
                star_rate
              </i>

              <b>
                ${rating}
              </b>
            </p>
          </div>

          <div
            class="restaurant-page__section-container"
          >
            <div
              class="restaurant-page__section"
            >
              <h2
                class="restaurant-page__h2"
                tabindex="0"
              >
                Categories
              </h2>

              <chip-container
                id="${this.categoriesId}"
              >
              </chip-container>
            </div>

            <div
              class="restaurant-page__section"
            >
              <h2
                class="restaurant-page__h2"
                tabindex="0"
              >
                Menus
              </h2>

              <ul
                style="padding-left: 1rem"
              >
                <li>
                  <b>
                    Foods:
                  </b>

                  <chip-container
                    id="${this.foodsId}"
                  >
                  </chip-container>
                </li>

                <li>
                  <b>
                    Drinks:
                  </b>

                  <chip-container
                    id="${this.drinksId}"
                  >
                  </chip-container>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initRestaurantCategories();
    this.initRestaurantMenus();
    this.initFavoriteBtn();
  }

  async initFavoriteBtn() {
    const { isFavorite } = this.state;
    const favoriteBtn = document.querySelector('favorite-button');
    favoriteBtn.init(isFavorite, this.handleFavoriteClick);
  }

  async handleFavoriteClick() {
    const { isFavorite, restaurant } = this.state;
    const {
      id, name, description, pictureId, city, rating,
    } = restaurant;
    const { favoriteRestaurantDb } = this;

    if (isFavorite) {
      await favoriteRestaurantDb.deleteRestaurant(id);
    } else {
      await favoriteRestaurantDb.putRestaurant(id, name, description, pictureId, city, rating);
    }

    this.setState({
      isFavorite: !isFavorite,
    });
  }

  initRestaurantCategories() {
    const { categories } = this.state.restaurant;
    const chipContainer = document.querySelector(`#${this.categoriesId}`);
    chipContainer.init(
      categories.map((category) => category.name),
    );
  }

  initRestaurantMenus() {
    const { menus } = this.state.restaurant;
    const { foods, drinks } = menus;

    const foodChipContainer = document.querySelector(`#${this.foodsId}`);
    foodChipContainer.init(
      foods.map((food) => food.name),
    );

    const drinkChipContainer = document.querySelector(`#${this.drinksId}`);
    drinkChipContainer.init(
      drinks.map((drink) => drink.name),
    );
  }
}

customElements.define('restaurant-element', RestaurantElement);
