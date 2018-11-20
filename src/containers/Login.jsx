import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextInput from '../components/InputTypes/TextInput';
import { login } from '../actions/index';

class Login extends Component {
  componentDidMount() {
    const { history, auth } = this.props;

    if (auth) {
      history.push('/dashboard');
    }
  }

  componentDidUpdate() {
    const { history, auth } = this.props;

    if (auth) {
      history.push('/dashboard');
    }
  }

  onSubmit(values) {
    const { login: loginActionCreator } = this.props;
    loginActionCreator(values);
  }

  render() {
    const { handleSubmit, valid } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Email"
            name="email"
            type="text"
            component={TextInput}
          />
          <Field
            label="Enter a password (8 or more characters)"
            name="password"
            type="password"
            component={TextInput}
          />
          <Button variant="contained" color="primary" disabled={!valid} type="submit">
            Login!
          </Button>
        </form>
        <div>
          <Link to="/lostpassword">
            <Button color="primary" type="button">
                Forgot Password
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/signup">
            <Button color="primary" type="button">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!re.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 8) {
    errors.password = 'Invalid password';
  }

  return errors;
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  validate,
  form: 'LoginForm',
})(
  connect(mapStateToProps, { login })(Login),
);
