import CONFIG from '../../global/config';

const { RESTAURANTS_API } = CONFIG;
const { BASE_URL, API_KEY } = RESTAURANTS_API;

const RestaurantsRequest = {
  getAllRestaurants() {
    return fetch(`${BASE_URL}/list`);
  },
  getRestaurantDetail(id) {
    return fetch(`${BASE_URL}/detail/${id}`);
  },
  searchRestaurants(query) {
    return fetch(`${BASE_URL}/search?q=${query}`);
  },
  postReview(id, name, review) {
    return fetch(
      `${BASE_URL}/review`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': API_KEY,
        },
        body: JSON.stringify({
          id, name, review,
        }),
      },
    );
  },
  getRestaurantSmallImageUrl(id) {
    return this.getRestaurantImageUrl(id, 'small');
  },
  getRestaurantMediumImageUrl(id) {
    return this.getRestaurantImageUrl(id, 'medium');
  },
  getRestaurantLargeImageUrl(id) {
    return this.getRestaurantImageUrl(id, 'large');
  },
  getRestaurantImageUrl(id, size) {
    return `${BASE_URL}/images/${size}/${id}`;
  },
};

export default RestaurantsRequest;
