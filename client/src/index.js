import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './testing/reportWebVitals';

const root = document.getElementById('root')

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    root
);

// reportWebVitals(console.log); //TODO: Turn on web vitals reporting
serviceWorker.unregister();
