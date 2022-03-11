import { createElement } from '../utils/dom.js';
import { isEqualObject } from '../utils/diff.js';
import { validateState } from '../common/validator.js';
import { DATA_TYPE_BOOLEAN } from '../constants.js';

export default function Loading({ $target, initialState }) {
  const $loading = createElement('div', {
    class: 'Loading Modal',
  });

  validateState(initialState, {
    isLoading: DATA_TYPE_BOOLEAN,
  });

  this.state = initialState;

  this.setState = (nextState) => {
    if (isEqualObject(this.state, nextState)) {
      return;
    }

    validateState(nextState, {
      isLoading: DATA_TYPE_BOOLEAN,
    });

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isLoading } = this.state;

    $loading.innerHTML = `
      <div class="content"></div>
        <img 
          width="100%" 
          src="https://cdn.roto.codes/images/nyan-cat.gif" 
          alt="Loading..." 
        />
      </div>
    `;

    $loading.style.display = isLoading ? 'block' : 'none';
  };

  this.render();

  $target.appendChild($loading);
}
