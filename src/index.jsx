import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Questionnaire from './containers/Questionnaire';
import Login from './containers/Login';
import Callback from './containers/Callback';
import Dashboard from './containers/Dashboard';
import Submission from './components/Questionnaire/Submission';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/questionnaire/:id" component={Questionnaire} />
          <Route path="/submission" component={Submission} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/callback" component={Callback} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.app'),
);
