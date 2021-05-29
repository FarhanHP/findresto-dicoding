import icon from '../../../public/images/logo/findresto-logo.png';
import StatefulElement from '../abstracts/StatefulElement';

class NavBar extends StatefulElement {
  constructor() {
    super({
      openDrawer: false,
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { openDrawer } = { ...this.state };

    this.innerHTML = `
      <nav
        class="nav"
      >
        <div
          class="nav__content"
        >
          <p
            class="nav__logo"
          >
            <image
              src="${icon}"
              class="nav__icon"
              alt="findresto's logo"
            />

            <span>
              FindResto
            </span>
          </p>

          <button
            class="nav__burger-btn"
            id="nav__burger-btn1"
          >
            <i
              class="material-icons"
            >
              ${openDrawer ? 'close' : 'menu'}
            </i>
          </button>

          <nav-links-list
            class="nav__links"
          >
          </nav-links-list>
        </div>
      
        <div
          class="nav__drawer ${openDrawer ? 'open' : ''}"
        >
          <nav-links-list
            class="nav__drawer__links"
          ></nav-links-list>
        </div>
      </nav>
    `;

    const body = document.querySelector('body');
    const burgerBtn = document.querySelector('#nav__burger-btn1');

    burgerBtn.addEventListener('click', (event) => {
      this.setState({
        openDrawer: !openDrawer,
      });

      event.stopPropagation();
    });

    body.addEventListener('click', (event) => {
      this.setState({
        openDrawer: false,
      });

      event.stopPropagation();
    });
  }
}

customElements.define('nav-bar', NavBar);
