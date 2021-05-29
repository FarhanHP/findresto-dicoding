import FavoritePage from '../view/pages/FavoritePage';
import HomePage from '../view/pages/HomePage';
import RestaurantPage from '../view/pages/RestaurantPage';

const routes = {
  '/': HomePage, // default page
  '/favorite': FavoritePage,
  '/restaurant/:id': RestaurantPage,
};

export default routes;
