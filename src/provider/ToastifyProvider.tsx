import React from 'react';
import { ToastContainer } from 'react-toastify';

const ToastifyProvider: React.FC = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      className={'topshopes-toast'}
    />
  );
  {
    /* Same as */
  }
  <ToastContainer />;
};

export default ToastifyProvider;
