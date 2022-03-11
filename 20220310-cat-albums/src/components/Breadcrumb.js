import { createElement } from '../utils/dom.js';
import { isEqualObject } from '../utils/diff.js';
import { validateState } from '../common/validator.js';
import { DATA_TYPE_ARRAY } from '../constants.js';

export default function Breadcrumb({
  $target,
  initialState,
  onClick,
}) {
  const $breadcrumb = createElement('nav', {
    class: 'Breadcrumb',
  });

  validateState(initialState, {
    paths: DATA_TYPE_ARRAY,
  });

  this.state = initialState;

  this.setState = (nextState) => {
    if (isEqualObject(this.state, nextState)) {
      return;
    }

    validateState(nextState, {
      paths: DATA_TYPE_ARRAY,
    });

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { paths } = this.state;

    $breadcrumb.innerHTML = `
      <div class="Breadcrumb__item">Root</div>
      ${paths.map(({ id, name }) => `
        <div 
          class="Breadcrumb__item" 
          data-id="${id}"
        >${name}</div>
      `).join('')}
    `;
  };

  this.render();

  $breadcrumb.addEventListener('click', (e) => {
    const $breadcrumbItem = e.target.closest('.Breadcrumb__item');

    if (!$breadcrumbItem) {
      return;
    }

    const { id } = $breadcrumbItem.dataset;

    onClick(id);
  });

  $target.appendChild($breadcrumb);
}
