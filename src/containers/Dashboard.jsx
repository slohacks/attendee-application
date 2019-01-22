import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { signout, rsvpResponse } from '../actions/index';
import requireAuth from '../components/requireAuth';
import Scenic from '../components/Scenic';
import './Dashboard.css';

function parseAppStatus(status) {
  if (!status) return 'Undecided';
  const statusEnum = ['Undecided', 'Accepted', 'Waitlisted', 'Rejected'];
  return statusEnum[status];
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 75,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

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
        user: { email },
        application,
        rsvp,
      } = this.props;

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
              onClick={this.handleSignOut}
              style={{
                marginTop: '1rem',
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
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

const DashboardWrapped = withStyles(styles)(Dashboard);

export default connect(mapStateToProps, { signout, rsvpResponse })(requireAuth(DashboardWrapped));
