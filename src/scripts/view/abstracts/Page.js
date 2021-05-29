import checkEqualStates from '../../utils/shared-abstract-functions/check-equal-state';

class Page {
  constructor(parentElement, state) {
    this.parentElement = parentElement;
    this.state = state;
  }

  setState(newState) {
    if (!checkEqualStates(this.state, newState)) {
      this.state = {
        ...this.state,
        ...newState,
      };

      this.render();
    }
  }

  render() {
    this.parentElement.innerHTML = '';
  }
}

export default Page;
