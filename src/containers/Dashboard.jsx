import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { signout } from '../actions/index';
import requireAuth from '../components/requireAuth';

class Dashboard extends Component {
  constructor() {
    super();
    this.boundSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    const { signout: signoutActionCreator } = this.props;
    signoutActionCreator();
  }

  render() {
    const { completedApp } = this.props;
    return (
      <div>
        <h1>
          Hello!
        </h1>
        <button type="button" onClick={this.boundSignOut}>
          Logout
        </button>

        {completedApp ? (
          <Button color="primary" disabled type="submit">
            <Link to="/questionnaire/0">
                Application Submitted
            </Link>
          </Button>
        ) : (
          <Button variant="contained" color="primary" type="submit">
            <Link to="/questionnaire/0">
                Start Application
            </Link>
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
};

export default connect(mapStateToProps, { signout })(requireAuth(Dashboard));
