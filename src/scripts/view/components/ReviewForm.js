import StatefulElement from '../abstracts/StatefulElement';

class ReviewForm extends StatefulElement {
  constructor() {
    super({
      loading: false,
      errorMsg: null,
    });
    this.nameId = `review-form__name-input-${this.key}`;
    this.contentId = `review-form__content-input-${this.key}`;
    this.submitId = `review-form__submit-${this.key}`;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  init(onSubmit) {
    this.onSubmit = onSubmit;

    this.render();
  }

  render() {
    const { loading, errorMsg } = this.state;

    this.innerHTML = `
      <div
        class="review-form"
      >
        ${errorMsg ? `
          <p
            class="review-form__error-msg"
          >
            ${errorMsg}
          </p>
        ` : ''}

        <div
          class="review-form__container"
        >
          <input
            class="review-form__name-input"
            placeholder="Name"
            id="${this.nameId}"
            type="text"
          />
        </div>

        <div
          class="review-form__container"
        >
          <textarea
            class="review-form__content-input"
            placeholder="Write your review here..."
            id="${this.contentId}"
            value="jembut"
          >
          </textarea>
        </div>

        <div
          class="review-form__submit-container"
        >
          <button
            id="${this.submitId}"
            class="review-form__submit"
            ${loading ? 'disabled' : ''}
          >
            ${loading ? 'SENDING...' : 'SEND'}
          </button>
        </div>
      </div>
    `;

    this.initSubmit();
  }

  initSubmit() {
    const submitBtn = document.querySelector(`#${this.submitId}`);
    if (submitBtn) {
      submitBtn.addEventListener('click', this.handleSubmit);
    }
  }

  async handleSubmit() {
    const name = document.querySelector(`#${this.nameId}`).value;
    const content = document.querySelector(`#${this.contentId}`).value;
    this.setState({
      loading: true,
      errorMsg: null,
    });
    const res = await this.onSubmit(name, content);

    if (res) {
      this.setState({
        loading: false,
        errorMsg: null,
      });
    } else {
      this.setState({
        loading: false,
        errorMsg: 'Fail to send review, try again later.',
      });
    }
  }
}

customElements.define('review-form', ReviewForm);
