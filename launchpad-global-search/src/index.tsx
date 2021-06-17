import React, { version } from 'react';
import ReactDOM from 'react-dom';
import '@glue42/launchpad-ui-react/dist/vnext.css';
import reportWebVitals from './reportWebVitals';
import Glue from '@glue42/desktop';
import { Glue42ReactFactory, GlueProvider } from '@glue42/react-hooks';
import { LaunchPad, GlobalSearch } from '@glue42/launchpad-ui-react';
import { BrowserRouter, Route } from "react-router-dom";
import { version as lpVersion } from "@glue42/launchpad-ui-react/package.json";

console.log(`@glue42/launchpad-ui-react@${lpVersion}`);

ReactDOM.render(
  <GlueProvider config={{ appManager: 'full', layouts: 'full' }} glueFactory={Glue as unknown as Glue42ReactFactory}>
    <BrowserRouter>
      <Route exact path="/launchpad" component={LaunchPad} />
      <Route path="/global-search" component={GlobalSearch} />
    </BrowserRouter>
  </GlueProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
