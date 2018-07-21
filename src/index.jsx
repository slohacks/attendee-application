import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'airbnb-browser-shims';

import reducers from './reducers';
import SignUp from './containers/SignUp';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.app'),
);
