import StatefulElement from '../abstracts/StatefulElement';

class ExpandableText extends StatefulElement {
  constructor() {
    super({
      openFull: false,
    });

    this.key = this.getAttribute('key') || Math.floor(Math.random() * 1000);
    this.text = this.getAttribute('text') || '';
    this.shortTextCount = Number(this.getAttribute('shortTextCount')) || 400;
    this.shortText = `${this.text.substring(0, this.shortTextCount)}...`;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { openFull } = this.state;
    const longText = this.text.length > this.shortTextCount;

    this.innerHTML = `
      <p
        class="justify-text"
        style="word-break: break-word;"
      >
        ${openFull || !longText ? this.text : `${this.shortText}...`}
      </p>

      ${!openFull && longText ? `     
        <button
          class="read-more-btn"
          id="read-more-btn-${this.key}"
        >
          Read More
        </button>
      ` : ''}
    `;

    this.initReadMoreBtn();
  }

  initReadMoreBtn() {
    const { openFull } = { ...this.state };
    const readMore = document.querySelector(`#read-more-btn-${this.key}`);
    if (readMore) {
      readMore.addEventListener('click', () => {
        this.setState({
          openFull: !openFull,
        });
      });
    }
  }
}

customElements.define('expandable-text', ExpandableText);
