import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './redux/store';
import {ChakraProvider} from "@chakra-ui/react";
import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {QueryClient, QueryClientProvider} from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
const emotionCache = createCache({
    key: 'emotion-css-cache',
    prepend: true, // ensures styles are prepended to the <head>, instead of appended
});
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <CacheProvider value={emotionCache}>
                    <ChakraProvider>
                        <App/>
                    </ChakraProvider>
                </CacheProvider>
            </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
