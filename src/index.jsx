import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import SignUp from './containers/SignUp';
import Questionnaire from './containers/Questionnaire';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Submission from './components/Questionnaire/Submission';
import NotFound from './components/NotFound';

const createStoreWithMiddleware = createStore(reducers, composeWithDevTools(
  applyMiddleware(ReduxThunk),
));

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <HashRouter>
      <div>
        <Switch>
          {['/', '/login'].map((path, index) => <Route path={path} component={Login} key={parseInt(index.toString(), index)} />)}
          <Route path="/sign-up" component={SignUp} />
          <Route path="/questionnaire/:id" component={Questionnaire} />
          <Route path="/submission" component={Submission} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>,
  document.querySelector('.app'),
);
