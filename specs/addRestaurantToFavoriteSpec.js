import '../src/scripts/view/components/RestaurantElement';
import '../src/scripts/view/components/FavoriteButton';
import '../src/scripts/view/components/ChipContainer';
import WINDOW_SIZE from '../src/scripts/const/window-sizes';
import FavoriteRestaurantIdb from '../src/scripts/utils/database/favorite-restaurant-idb';

/* global describe it expect beforeEach afterEach */
/* eslint no-undef: "error" */

describe('Adding a restaurant to the favorite list', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <restaurant-element>
    `;
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show "add to favorite" button when the restaurant is not in the favorite list', async () => {
    const restaurantElement = document.querySelector('restaurant-element');
    await restaurantElement.init({
      restaurant: {
        id: 1,
        categories: [],
        menus: {
          foods: [],
          drinks: [],
        },
      },
      windowSize: WINDOW_SIZE,
      favoriteRestaurantDb: FavoriteRestaurantIdb,
    });

    expect(document.querySelector('[aria-label="add favorite"]')).toBeTruthy();
  });

  it('shouldn\'t show "remove favorite" button when the restaurant is not in the favorite list', async () => {
    const restaurantElement = document.querySelector('restaurant-element');
    await restaurantElement.init({
      restaurant: {
        id: 1,
        categories: [],
        menus: {
          foods: [],
          drinks: [],
        },
      },
      windowSize: WINDOW_SIZE,
      favoriteRestaurantDb: FavoriteRestaurantIdb,
    });
    expect(document.querySelector('[aria-label="remove favorite"]')).toBeFalsy();
  });

  it('should be able to add the restaurant to favorite', async () => {
    const restaurantElement = document.querySelector('restaurant-element');
    await restaurantElement.init({
      restaurant: {
        id: 1,
        categories: [],
        menus: {
          foods: [],
          drinks: [],
        },
      },
      windowSize: WINDOW_SIZE,
      favoriteRestaurantDb: FavoriteRestaurantIdb,
    });

    const favoriteBtn = document.querySelector('.favorite-btn');
    favoriteBtn.dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant.id).toBe(1);
  });

  it('Shouldn\'t add the restaurant to favorite if it is already be favorite', async () => {
    const restaurantElement = document.querySelector('restaurant-element');
    await restaurantElement.init({
      restaurant: {
        id: 1,
        categories: [],
        menus: {
          foods: [],
          drinks: [],
        },
      },
      windowSize: WINDOW_SIZE,
      favoriteRestaurantDb: FavoriteRestaurantIdb,
    });

    await FavoriteRestaurantIdb.putRestaurant(1);
    const favoriteBtn = document.querySelector('.favorite-btn');
    favoriteBtn.dispatchEvent(new Event('click'));
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants.length).toBe(1);
  });

  it('Shouldn\'t add the restaurant if it doesn\'t have id', async () => {
    const restaurantElement = document.querySelector('restaurant-element');
    await restaurantElement.init({
      restaurant: {
        categories: [],
        menus: {
          foods: [],
          drinks: [],
        },
      },
      windowSize: WINDOW_SIZE,
      favoriteRestaurantDb: FavoriteRestaurantIdb,
    });

    const favoriteBtn = document.querySelector('.favorite-btn');
    favoriteBtn.dispatchEvent(new Event('click'));
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants.length).toBe(0);
  });
});
