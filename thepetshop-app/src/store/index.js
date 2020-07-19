import {createStore,applyMiddleware,compose} from 'redux';

import reducer from './reducers';

const store = createStore(reducer);

export default store;