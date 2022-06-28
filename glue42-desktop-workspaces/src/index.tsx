import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlueProvider } from '@glue42/react-hooks';
import Glue from "@glue42/desktop";
import GlueWorkspaces from "@glue42/workspaces-api";



ReactDOM.render(
  <React.StrictMode>
    <GlueProvider settings={{
      desktop: {
        factory: (_) => {
          return Glue({ libraries: [GlueWorkspaces], appManager: "skipIcons" })
        }
      }
    }}>
      <App />
    </GlueProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
