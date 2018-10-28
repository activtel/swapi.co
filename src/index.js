import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as reducers from './store/reducers';

// наименование ключа в локальном хранилище localStorage
const LOCAL_STORAGE_NAME = 'swapi-client';

// middleware для логирования действий и store в консоль
const logger = store => next => action => {
    console.groupCollapsed("dispatching", action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    next(action);
    console.log('next state', store.getState());
    console.groupEnd()
}

// middleware для сохранения store в локальном хранилище localStorage
const saver = store => next => action => {
    let result = next(action);
    localStorage[LOCAL_STORAGE_NAME] = JSON.stringify(store.getState());
    return result;
}

const store = createStore(
    combineReducers(reducers),
    (localStorage[LOCAL_STORAGE_NAME])
        ? JSON.parse(localStorage[LOCAL_STORAGE_NAME])
        : {},
    applyMiddleware(logger, saver, thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
