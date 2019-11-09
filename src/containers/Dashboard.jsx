import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { PageContainer } from '../styled/containers';
import { signout } from '../actions/index';
import requireAuth from '../components/requireAuth';

function parseAppStatus(status) {
  if (!status) return 'Undecided';
  const statusEnum = ['Undecided', 'Accepted', 'Waitlisted', 'Rejected'];
  return statusEnum[status];
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleApplicationStart = this.handleApplicationStart.bind(this);
    this.handleRSVP = this.handleRSVP.bind(this);
  }

  handleRSVP() {
    const { history } = this.props;
    history.push('/rsvp');
  }

  handleSignOut() {
    const { signout: signoutActionCreator } = this.props;
    signoutActionCreator();
  }

  handleApplicationStart() {
    const { history: { push } } = this.props;
    push('/questionnaire/0');
  }

  render() {
    const
      {
        completedApp,
        user,
        application,
        rsvp,
      } = this.props;

    return (
      <PageContainer>
        <div className="containerPadding">
          <h1>
            {user ? `Hello ${user.email.substring(0, user.email.indexOf('@'))}!` : 'Hello!'}
          </h1>
          {completedApp && application.status === 0 && (
            <p>Your application has been submitted</p>
          )}
          {!completedApp && (
            <div>
              <p>Applications are now closed for all students!</p>
              <p>See you next year!</p>
            </div>
          )}
          {application && (
            <div>
              <p>
                {`Your application status is ${parseAppStatus(application.status)}.`}
              </p>
              {rsvp && application.status === 1 && <p>Your RSVP is submitted!</p>}
              {!rsvp && application.status === 1 && (
                <div>
                  <p>RSVPs have been closed.</p>
                </div>
              )}
            </div>
          )}
          <Button
            color="primary"
            type="button"
            onClick={this.handleApplicationStart}
            style={{
              marginTop: '1rem',
            }}
          >
            Start Application
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={this.handleSignOut}
            style={{
              marginTop: '1rem',
            }}
          >
            Logout
          </Button>
        </div>
      </PageContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    completedApp: state.application.completedApplication,
    user: state.auth.user,
    application: state.application.application,
    rsvp: state.application.rsvp,
  };
}

Dashboard.defaultProps = {
  user: PropTypes.shape({
    email: '!',
  }),
  rsvp: null,
  application: null,
  completedApp: null,
};

Dashboard.propTypes = {
  signout: PropTypes.func.isRequired,
  completedApp: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  rsvp: PropTypes.bool,
  application: PropTypes.shape(),
};

export default connect(mapStateToProps, { signout })(requireAuth(Dashboard));
