import { DATA_TYPE_ARRAY, DATA_TYPE_NULL } from '../constants.js';

export const detailedTypeof = (value) => {
  if (value === null) {
    return DATA_TYPE_NULL;
  }

  if (Array.isArray(value)) {
    return DATA_TYPE_ARRAY;
  }

  return typeof (value);
};
