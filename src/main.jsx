/* eslint-disable no-unused-vars */
/* eslint-disable react/no-deprecated */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
// 全局样式
import './index.css'

function render({ appContent, loading }) {
  const container = document.getElementById('root');
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App loading={loading} content={appContent} />
    </React.StrictMode>,
  )
}

render({ loading: false });

