import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { signout } from '../actions/index';
import requireAuth from '../components/requireAuth';
import Scenic from '../components/Scenic';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleApplicationStart = this.handleApplicationStart.bind(this);
  }

  handleSignOut() {
    const { signout: signoutActionCreator } = this.props;
    signoutActionCreator();
  }

  handleApplicationStart() {
    const { history: { push } } = this.props;
    push('/questionnaire/0');
  }

  handleApplicationButton() {
    const { completedApp, user: { email } } = this.props;
    if (completedApp) {
      return (
        <Button variant="outlined" color="primary" disabled type="submit">
          Application Submitted
        </Button>
      );
    }
    if (!completedApp && email.match('.*@calpoly[.]edu')) {
      return (
        <Button onClick={this.handleApplicationStart} variant="outlined" color="primary" type="submit">
          Start Application
        </Button>
      );
    }
    return (
      <Button variant="outlined" color="primary" disabled type="submit">
        Applications closed, hope to you see next year!
      </Button>
    );
  }

  render() {
    const { user: { email } } = this.props;
    return (
      <div className="container">
        <div className="subContainer">
          <Scenic />
        </div>
        <div className="subContainer">
          <div className="containerPadding">
            <h1>
              {email ? `Hello ${email.substring(0, email.indexOf('@'))}!` : 'Hello!'}
            </h1>
            {email ? this.handleApplicationButton() : null}
            <Button color="primary" type="button" onClick={this.handleSignOut} style={{ marginLeft: '1rem' }}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { completedApp: state.auth.completedApplication, user: state.auth.user };
}

Dashboard.defaultProps = {
  user: PropTypes.shape({
    email: '!',
  }),
};

Dashboard.propTypes = {
  signout: PropTypes.func.isRequired,
  completedApp: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default connect(mapStateToProps, { signout })(requireAuth(Dashboard));
