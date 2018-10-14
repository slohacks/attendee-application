import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import SignUp from './containers/SignUp';
import Questionnaire from './containers/Questionnaire';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Submission from './components/Questionnaire/Submission';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/questionnaire/:id" component={Questionnaire} />
          <Route path="/submission" component={Submission} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.app'),
);
