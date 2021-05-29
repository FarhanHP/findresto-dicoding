import checkEqualStates from '../../utils/shared-abstract-functions/check-equal-state';
import StatelessElement from './StatelessElement';

class StatefulElement extends StatelessElement {
  constructor(state) {
    super();
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
}

export default StatefulElement;
