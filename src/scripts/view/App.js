import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import Page from './abstracts/Page';

class App extends Page {
  constructor(parentElement) {
    super(parentElement);
    this.contentElement = null;
  }

  render() {
    this.parentElement.innerHTML = `
      <button id="skip-link" class="skip-link">
        Jump to Content
      </button>

      <nav-bar>
      </nav-bar>

      <main
        class="main"
      >

      </main>

      <footer-bar></footer-bar>
    `;

    this.contentElement = document.querySelector('main');
    this.afterRender();

    document.querySelector('#skip-link').addEventListener('click', () => {
      document.querySelector('#maincontent').focus();
    });
  }

  afterRender() {
    const url = UrlParser.parseActiveUrlWithCombiner();

    const page = new routes[url](this.contentElement);
    page.render();
  }
}

export default App;
