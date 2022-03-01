import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import reportWebVitals from './reportWebVitals';

console.log(store.getState());

const root = document.getElementById('root')
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    root
);

reportWebVitals(console.log);

serviceWorker.unregister();
