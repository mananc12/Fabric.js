import { createStore } from 'redux';
import imageReducer from './reducers';

const store = createStore(imageReducer);

export default store;
