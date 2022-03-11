import { createElement } from '../utils/dom.js';
import { isEqualObject } from '../utils/diff.js';
import { validateState } from '../common/validator.js';
import { DATA_TYPE_ARRAY, DATA_TYPE_BOOLEAN, NODE_TYPE_DIRECTORY } from '../constants.js';

export default function Nodes({
  $target,
  initialState,
  onClick,
  onPrevClick,
}) {
  const $nodes = createElement('div', {
    class: 'Nodes',
  });

  validateState(initialState, {
    isRoot: DATA_TYPE_BOOLEAN,
    nodes: DATA_TYPE_ARRAY,
  });

  this.state = initialState;

  this.setState = (nextState) => {
    if (isEqualObject(this.state, nextState)) {
      return;
    }

    validateState(nextState, {
      isRoot: DATA_TYPE_BOOLEAN,
      nodes: DATA_TYPE_ARRAY,
    });

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot, nodes } = this.state;

    $nodes.innerHTML = `
      ${isRoot ? '' : `
        <div class="Node Prev">
          <img 
            src="https://cdn.roto.codes/images/prev.png" 
            alt="previous button"
          />
        </div>
      `}
      ${nodes.map(({ id, type, name }) => `
        <div class="Node" data-id="${id}">
          ${type === NODE_TYPE_DIRECTORY
            ? '<img src="https://cdn.roto.codes/images/directory.png" alt="directory" />'
            : '<img src="https://cdn.roto.codes/images/file.png" alt="file" />'}
          <div>${name}</div>
        </div>        
      `).join('')}
    `;
  };

  this.render();

  $nodes.addEventListener('click', (e) => {
    const $node = e.target.closest('.Node');

    if (!$node) {
      return;
    }

    if (Array.from($node.classList).includes('Prev')) {
      onPrevClick();
      return;
    }

    const { id } = $node.dataset;

    const clickedNode = this.state.nodes.find((node) => node.id === id);

    if (!clickedNode) {
      return;
    }

    onClick(clickedNode);
  });

  $target.appendChild($nodes);
}
