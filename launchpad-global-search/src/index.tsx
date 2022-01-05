import ReactDOM from 'react-dom';
import '@glue42/launchpad-ui-react/dist/vnext.css';
import reportWebVitals from './reportWebVitals';
import Glue from '@glue42/desktop';
import { GlueProvider } from '@glue42/react-hooks';
import { LaunchPad, GlobalSearch } from '@glue42/launchpad-ui-react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { version as lpVersion } from "@glue42/launchpad-ui-react/package.json";

console.log(`@glue42/launchpad-ui-react@${lpVersion}`);

ReactDOM.render(
  <GlueProvider settings={{
    desktop: {
      config: { appManager: 'full', layouts: 'full' },
      factory: (config: any) => Glue(config) as any
    },
  }}>
    <BrowserRouter>
    <Routes>
      <Route path="/launchpad" element={<LaunchPad/>} />
      <Route path="/global-search" element={<GlobalSearch placeholder='Glue42 Global Search...'/>} />
    </Routes>
    </BrowserRouter>
  </GlueProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
