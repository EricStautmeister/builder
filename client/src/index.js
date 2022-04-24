import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { Jelly } from '@uiball/loaders';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './testing/reportWebVitals';

const root = document.getElementById('root');

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense
            fallback={
                <div className="centeringDiv">
                    <Jelly size={80} speed={0.9} color="black" />
                </div>
            }>
            <Provider store={store}>
                <App />
            </Provider>
        </React.Suspense>
    </React.StrictMode>,
    root
);

// reportWebVitals(console.log); //TODO: Turn on web vitals reporting
serviceWorker.unregister();
