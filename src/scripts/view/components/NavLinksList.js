import StatelessElement from '../abstracts/StatelessElement';

class NavLinksList extends StatelessElement {
  constructor() {
    super();

    this.class = this.getAttribute('class') || '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <ul 
        class="${this.class}"
      >
        <li>
          <a
            href="/"
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="/#/favorite"
          >
            Favorite
          </a>
        </li>

        <li>
          <a
            href="https://github.com/FarhanHP"
            target="_blank"
            rel="noopener"
          >
            About Us
          </a>
        </li>
      <ul>
    `;
  }
}

customElements.define('nav-links-list', NavLinksList);
