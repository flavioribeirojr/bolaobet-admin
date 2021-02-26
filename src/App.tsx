import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from './router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <React.Fragment>
      <Router />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
