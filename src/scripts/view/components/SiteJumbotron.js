import StatelessElement from '../abstracts/StatelessElement';

class SiteJumbotron extends StatelessElement {
  // urls should be sorted from smaller images
  init({
    smallImage, mediumImage, largeImage, caption, imageTitle,
  }) {
    this.smallImage = smallImage;
    this.mediumImage = mediumImage;
    this.largeImage = largeImage;
    this.imageTitle = imageTitle;
    this.caption = caption;
    this.render();
  }

  render() {
    this.innerHTML = `
      <style
        scoped
      >
        .jumbotron {
          background-image: url(${this.smallImage})
        }

        @media only screen and (min-width: 600px) {
          .jumbotron {
            background-image: url(${this.mediumImage})
          }
        }

        @media only screen and (min-width: 960px) {
          .jumbotron {
            background-image: url(${this.largeImage})
          }
        }

      </style>
      <div
        class="jumbotron"
        ${this.title !== undefined ? `title="${this.title}"` : ''}
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
