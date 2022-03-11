import { detailedTypeof } from '../utils/type.js';

const validateKey = (state, key) => {
  if (!Object.hasOwnProperty.call(state, key)) {
    throw new Error(`Missing required key: ${key}`);
  }
};

const validateDataTypes = (state, key, dataTypes) => {
  const value = state[key];
  const currentDataType = detailedTypeof(value);

  if (!dataTypes.includes(currentDataType)) {
    throw new Error(`Expected ${dataTypes.join('or ')} type of ${key}: ${currentDataType}`);
  }
};

export const validateState = (state, requiredProperties = {}) => {
  Object.entries(requiredProperties).forEach(([key, dataTypes]) => {
    validateKey(state, key);

    const dataTypesArray = Array.isArray(dataTypes) ? dataTypes : [dataTypes];

    validateDataTypes(state, key, dataTypesArray);
  });
};
