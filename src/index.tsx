import createAPI from 'api';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createSagas from 'sagas';
import App from './component/app/App';
import './index.css';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const api = createAPI({ baseURL: process.env.REACT_APP_BASE_API_URL });
const sagas = createSagas(api);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
