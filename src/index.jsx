import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import SignUp from './containers/SignUp';
import Questionaire from './containers/Questionaire';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/questionaire" component={Questionaire} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.app'),
);
