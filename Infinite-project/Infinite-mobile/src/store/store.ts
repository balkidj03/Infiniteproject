import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducers} from './reducers';

const initialState = {};
const middleWare = [thunk];

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleWare),
);
