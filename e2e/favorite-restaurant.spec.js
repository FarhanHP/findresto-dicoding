const assert = require('assert');

/* global Feature Scenario locate */
/* eslint no-undef: "error" */

Feature('add favorite restaurant');

Scenario('Adding and removing a favorite restaurant', async ({ I }) => {
  // make sure favorite is empty
  I.amOnPage('/#/favorite');
  I.see('Favorite Restaurants', 'h1');
  I.see('No Restaurants', '.no-restaurants');

  // adding a favorite restaurant
  I.amOnPage('/');
  I.seeElement('.restaurant-card__name');
  const movieTitle1 = await I.grabTextFrom(locate('.restaurant-card__name').first());
  I.seeElement('.restaurant-card__image-container');
  I.click(locate('.restaurant-card__image-container').first());
  I.seeElement('.favorite-btn');
  I.click('.favorite-btn');

  // making sure the restaurant is in favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-card__name');
  const movieTitle2 = await I.grabTextFrom(locate('.restaurant-card__name').first());
  assert.strictEqual(movieTitle1, movieTitle2);

  // removing the restaurant from favorite
  I.seeElement('.restaurant-card__image-container');
  I.click(locate('.restaurant-card__image-container').first());
  I.seeElement('.restaurant-page__h1');
  const movieTitle3 = await I.grabTextFrom('.restaurant-page__h1');

  // making sure the visited restaurant is same as first restaurant
  assert.strictEqual(movieTitle1, movieTitle3);

  // start to removing the restaurant from favorite
  I.seeElement('.favorite-btn');
  I.click('.favorite-btn');

  // making sure favorite is empty
  I.amOnPage('/#/favorite');
  I.see('Favorite Restaurants', 'h1');
  I.see('No Restaurants', '.no-restaurants');
});
