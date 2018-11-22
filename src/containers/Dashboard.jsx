import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { signout } from '../actions/index';
import requireAuth from '../components/requireAuth';

class Dashboard extends Component {
  constructor() {
    super();
    this.boundSignOut = this.handleSignOut.bind(this);
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

  render() {
    const { completedApp } = this.props;
    return (
      <div>
        <h1>
          Hello Applicant!
        </h1>

        <Button variant="outlined" color="primary" type="button" onClick={this.boundSignOut} style={{ marginRight: '1rem' }}>
          Logout
        </Button>

        {completedApp ? (
          <Button variant="outlined" color="primary" disabled type="submit">
            Application Submitted
          </Button>
        ) : (
          <Button onClick={this.handleApplicationStart} variant="contained" color="primary" type="submit">
            Start Application
          </Button>
        )
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { completedApp: state.auth.completedApplication };
}

Dashboard.propTypes = {
  signout: PropTypes.func.isRequired,
  completedApp: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, { signout })(requireAuth(Dashboard));
