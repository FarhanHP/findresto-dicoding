import StatelessElement from '../abstracts/StatelessElement';

class FooterBar extends StatelessElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer
        class="footer"
      >
        Copyright &copy; 2021 - FindResto
      </footer>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
