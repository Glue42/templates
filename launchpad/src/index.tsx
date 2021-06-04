import React from 'react';
import ReactDOM from 'react-dom';
import '@glue42/launchpad-ui-react/dist/vnext.css';
import reportWebVitals from './reportWebVitals';
import Glue from '@glue42/desktop';
import { Glue42ReactFactory, GlueProvider } from '@glue42/react-hooks';

import { LaunchPad } from '@glue42/launchpad-ui-react';

ReactDOM.render(
  <GlueProvider config={{ appManager: 'full', layouts: 'full' }} glueFactory={Glue as unknown as Glue42ReactFactory}>
      <LaunchPad />
  </GlueProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
