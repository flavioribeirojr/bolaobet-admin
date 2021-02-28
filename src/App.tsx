import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from './router';
import { Provider } from 'react-redux';
import { ReduxStore } from './redux-store';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={ReduxStore}>
      <Router />
      <ToastContainer />
    </Provider>
  );
}

export default App;
