import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import App from 'src/main/App';
import { MainStore } from 'src/data/MainStore';

ReactDOM.render(
  <Provider store={MainStore}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);