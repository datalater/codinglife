export const createElement = (tagName, attributes = {}) => {
  const $element = document.createElement(tagName);

  Object.entries(attributes).forEach(([key, value]) => {
    $element.setAttribute(key, value);
  });

  return $element;
};
