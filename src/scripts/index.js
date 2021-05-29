import 'regenerator-runtime'; /* for async await transpile */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/main.css';
import './view/components/NavLinksList';
import './view/components/NavBar';
import './view/components/SiteJumbotron';
import './view/components/RestaurantsList';
import './view/components/RestaurantCard';
import './view/components/FooterBar';
import './view/components/SearchBar';
import './view/components/ExpandableText';
import './view/components/DataChip';
import './view/components/ChipContainer';
import './view/components/ReviewCard';
import './view/components/ReviewCardContainer';
import './view/components/ReviewForm';
import './view/components/FavoriteButton';
import './view/components/RestaurantElement';
import './view/components/ReviewsElement';
import App from './view/App';
import swRegister from './utils/sw-register';

const app = new App(document.querySelector('#app'));

window.addEventListener('hashchange', () => {
  app.render();
});

window.addEventListener('load', () => {
  app.render();
  swRegister();
});
