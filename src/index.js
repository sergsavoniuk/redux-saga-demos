import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

import configureStore from './redux/configureStore';
import rootSaga from './sagas';

const store = configureStore();
store.runSaga(rootSaga);

store.dispatch({ type: 'TEST_ACTION' });

render(<Root store={store} />, document.getElementById('root'));

serviceWorker.register();
