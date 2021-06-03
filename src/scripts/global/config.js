const CONFIG = {
  CACHE: {
    NAME: 'findresto-v-1.1.2', // new Date().toISOString()
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
