import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import ForgotPassword from './containers/ForgotPassword';
import NotFound from './containers/NotFound';
import Confirmation from './containers/Confirmation';
import Questionnaire from './containers/Questionnaire';

import './index.css';

const createStoreWithMiddleware = createStore(reducers, composeWithDevTools(
  applyMiddleware(ReduxThunk),
));

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/confirmation" component={Confirmation} />
        <Route path="/signup" component={SignUp} />
        <Route path="/questionnaire/:id" component={Questionnaire} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.querySelector('.app'),
);
