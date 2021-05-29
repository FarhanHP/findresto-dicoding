import { openDB } from 'idb';
import CONFIG from '../../global/config';

const { NAME, VERSION, STORE_NAMES } = CONFIG.DATABASE;
const { FAVORITE_RESTAURANTS } = STORE_NAMES;

const dbPromise = openDB(NAME, VERSION, {
  upgrade: (database) => {
    database.createObjectStore(FAVORITE_RESTAURANTS, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    return (await dbPromise).get(FAVORITE_RESTAURANTS, id);
  },

  async getAllRestaurants() {
    return (await dbPromise).getAll(FAVORITE_RESTAURANTS);
  },

  async putRestaurant(id, name, description, pictureId, city, rating) {
    return (await dbPromise).put(FAVORITE_RESTAURANTS, {
      id, name, description, pictureId, city, rating,
    });
  },

  async deleteRestaurant(id) {
    return (await dbPromise).delete(FAVORITE_RESTAURANTS, id);
  },
};

export default FavoriteRestaurantIdb;
