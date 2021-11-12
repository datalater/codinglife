import { createStore, combineReducers } from 'redux';

import reducer from './reducer';

const rootReducer = combineReducers({ reducer });

const store = createStore(rootReducer);

export default store;

export type RootState = ReturnType<typeof reducer>;
