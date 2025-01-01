import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router";
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.js';

import './index.scss';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>,)
