import StatelessElement from '../abstracts/StatelessElement';

class SiteJumbotron extends StatelessElement {
  connectedCallback() {
    this.url = this.getAttribute('url') || null;
    this.caption = this.getAttribute('caption') || null;
    this.imageTitle = this.getAttribute('imageTitle') || null;

    this.render();
  }

  render() {
    this.innerHTML = `
      <div
        class="jumbotron"
        style="
          background-image: url(${this.url});
        "
        ${this.title !== null ? `title="${this.title}"` : ''}
      >
        ${this.caption ? `
          <p
            class="jumbotron__content"
          >
            ${this.caption}
          </p>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('site-jumbotron', SiteJumbotron);
