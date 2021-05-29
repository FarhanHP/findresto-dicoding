import WINDOW_SIZE from '../src/scripts/const/window-sizes';
import FavoriteRestaurantIdb from '../src/scripts/utils/database/favorite-restaurant-idb';

/* global describe it expect beforeEach afterEach */
/* eslint no-undef: "error" */

describe('Remove the restaurant from favorite list', () => {
  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant(1);

    document.body.innerHTML = `
      <restaurant-element>
    `;
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show "remove favorite" button when the restaurant is in favorite list', async () => {
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

    expect(document.querySelector('[aria-label="remove favorite"]')).toBeTruthy();
  });

  it('shouldn\'t show "add favorite" button when the restaurant is in favorite list', async () => {
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

    expect(document.querySelector('[aria-label="add favorite"]')).toBeFalsy();
  });

  it('it should be able to remove the restaurant from favorite', async () => {
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

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants.length).toBe(0);
  });

  it('it shouldn\'t throw error when removing a removed restaurant from favorite', async () => {
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

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    const favoriteBtn = document.querySelector('.favorite-btn');
    favoriteBtn.dispatchEvent(new Event('click'));

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants.length).toBe(0);
  });
});
