import React from 'react'
import ReactDOM from 'react-dom/client'
import { Connect } from '@stacks/connect-react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Connect
      authOptions={{
        appDetails: {
          name: 'Gated.so',
          icon: window.location.origin + '/icon.png',
        },
      }}
    >
      <App />
    </Connect>
  </React.StrictMode>,
)