const CONFIG = {
  CACHE: {
    NAME: new Date().toISOString(), // findresto-v-1.3
  },
  RESTAURANTS_API: {
    BASE_URL: 'https://restaurant-api.dicoding.dev',
    API_KEY: '12345',
  },
  DATABASE: {
    NAME: 'findresto-database',
    VERSION: 1,
    STORE_NAMES: {
      FAVORITE_RESTAURANTS: 'favorite-restaurant',
    },
  },
};

export default CONFIG;
