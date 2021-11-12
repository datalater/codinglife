import { createStore } from 'redux';

import reducer from './reducer';

const store = createStore(reducer as any);

export default store;

export type RootState = ReturnType<typeof reducer>;
