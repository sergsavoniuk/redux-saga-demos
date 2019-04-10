import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './rootReducer';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;

  return store;
}
