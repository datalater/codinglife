import { createElement } from '../utils/dom.js';
import { isEqualObject } from '../utils/diff.js';
import { validateState } from '../common/validator.js';
import { DATA_TYPE_NULL, DATA_TYPE_STRING } from '../constants.js';

export default function ImageViewer({
  $target,
  initialState,
  onClose,
}) {
  const $imageViewer = createElement('div', {
    class: 'ImageViewer Modal',
  });

  validateState(initialState, {
    selectedImageUrl: [DATA_TYPE_NULL, DATA_TYPE_STRING],
  });

  this.state = initialState;

  this.setState = (nextState) => {
    if (isEqualObject(this.state, nextState)) {
      return;
    }

    validateState(nextState, {
      selectedImageUrl: [DATA_TYPE_NULL, DATA_TYPE_STRING],
    });

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selectedImageUrl } = this.state;

    $imageViewer.innerHTML = `
      <div class="content">
        <img 
          src="${selectedImageUrl}" 
          alt="cat"
        />
      </div>
    `;

    $imageViewer.style.display = selectedImageUrl ? 'block' : 'none';
  };

  this.render();

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  });

  $imageViewer.addEventListener('click', (e) => {
    if (Array.from(e.target.classList).includes('Modal')) {
      onClose();
    }
  });

  $target.appendChild($imageViewer);
}
