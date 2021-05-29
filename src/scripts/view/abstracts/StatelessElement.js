class StatelessElement extends HTMLElement {
  constructor() {
    super();

    this.key = this.getAttribute('key') || Math.floor(Math.random() * 1000);
  }
}

export default StatelessElement;
