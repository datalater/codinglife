const isObject = (obj) => obj !== null && typeof obj === 'object';

export const isEqualObject = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    const areBothObjects = isObject(val1) && isObject(val2);

    if (areBothObjects && !isEqualObject(val1, val2)) {
      return false;
    }

    if (!areBothObjects && val1 !== val2) {
      return false;
    }
  }

  return true;
};
