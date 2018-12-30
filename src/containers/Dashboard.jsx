import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
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
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRSVP = this.handleRSVP.bind(this);
    this.state = {
      open: false,
    };
  }

  handleRSVP(decision) {
    const { rsvpResponse: sendRsvp, user } = this.props;
    sendRsvp(user, decision, this.handleClose);
  }

  handleSignOut() {
    const { signout: signoutActionCreator } = this.props;
    signoutActionCreator();
  }

  handleApplicationStart() {
    const { history: { push } } = this.props;
    push('/questionnaire/0');
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const
      {
        completedApp,
        user,
        application,
        rsvp,
        classes,
      } = this.props;

    const { open } = this.state;
    return (
      <div className="container">
        <div className="subContainer">
          <Scenic />
        </div>
        <div className="subContainer">
          <div className="containerPadding">
            <h1>
              {user.email ? `Hello ${user.email.substring(0, user.email.indexOf('@'))}!` : 'Hello!'}
            </h1>

            {completedApp ? (
              <Button variant="outlined" color="primary" disabled type="submit">
                Application Submitted
              </Button>
            ) : (
              <Button onClick={this.handleApplicationStart} variant="outlined" color="primary" type="submit">
                Start Application
              </Button>
            )}

            <Button
              color="primary"
              type="button"
              onClick={this.handleSignOut}
              style={{
                marginLeft: '1rem',
              }}
            >
              Logout
            </Button>
          </div>
          {application ? (
            <Card className="cardStyle">
              <CardContent>
                <h3 className="cardTitle">Application Decision</h3>
                <ListItem>
                  <ListItemText primary="Status" secondary={parseAppStatus(application.status)} />
                </ListItem>
                {rsvp && application.status === 1 ? <p>Thank you for your response!</p> : null}
                { !rsvp && application.status === 1
                  ? (
                    <div>
                      <Button
                        size="small"
                        color="primary"
                        variant="text"
                        onClick={this.handleOpen}
                      >
                          RSVP Now
                      </Button>
                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open}
                        onClose={this.handleClose}
                      >
                        <div className={classes.paper}>
                          <Typography variant="h6" id="modal-title">
                            Please let us know if you are coming by January 7th, 2019
                          </Typography>
                          <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => this.handleRSVP(true)}
                          >
                          GOING
                          </Button>
                          <Button
                            size="small"
                            color="secondary"
                            variant="contained"
                            onClick={() => this.handleRSVP(false)}
                          >
                          NOT GOING
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  ) : null
                }
              </CardContent>
            </Card>
          ) : null}
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
  rsvpResponse: PropTypes.func.isRequired,
  rsvp: PropTypes.bool,
  application: PropTypes.shape(),
  classes: PropTypes.shape().isRequired,

};

const DashboardWrapped = withStyles(styles)(Dashboard);

export default connect(mapStateToProps, { signout, rsvpResponse })(requireAuth(DashboardWrapped));
