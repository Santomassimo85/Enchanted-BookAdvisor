/**
 * Main entry point for the BookAdvisor React application.
 * Sets up Redux store, React Router, and Toast notifications.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main application component
import { BrowserRouter } from 'react-router-dom'; // Enables routing
import { Provider } from 'react-redux'; // Makes Redux store available
import { store } from './store'; // Redux store instance
import { ToastContainer } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles

// Render the React application into the root DOM node
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide the Redux store to the entire app */}
    <Provider store={store}>
      {/* Enable client-side routing */}
      <BrowserRouter>
        {/* Main application component */}
        <App />
        {/* Toast notification container, positioned bottom-right, auto-closes after 3 seconds, dark theme */}
        <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
