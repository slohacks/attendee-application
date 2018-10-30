import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
    return (
      <div>
        <button type="button" onClick={this.boundSignOut}>
          Logout
        </button>
        <Link to="/questionnaire/0">
          Start application
        </Link>
      </div>
    );
  }
}

Dashboard.propTypes = {
  signout: PropTypes.func.isRequired,
};

export default connect(null, { signout })(requireAuth(Dashboard));
