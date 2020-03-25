import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import * as reducers from './ducks';
import { apiService, createLogger } from './middlewares';

export default function configureStore(initialState) {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(apiService, createLogger(true)),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
}
