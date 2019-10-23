import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Scenic from '../components/Scenic';
import { login } from '../actions/index';
import TextInput from '../components/InputTypes/2019/TextInput';
import { StyledButton } from '../components/common';

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
    const {
      handleSubmit,
      valid,
      errorMessage,
      loading,
      history: { push },
    } = this.props;
    return (
      <div className="container">
        <div className="subContainer">
          <Scenic />
        </div>
        <div className="subContainer">
          <div className="containerPadding">
            <h1>
              <span className="sh">
                SLO Hacks
              </span>
              <br />
              Attendee Application
            </h1>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Email"
                name="email"
                type="text"
                placeholder="Email"
                component={TextInput}
              />
              <Field
                label="Enter a password (8 or more characters)"
                name="password"
                type="password"
                placeholder="Password"
                component={TextInput}
              />
              {errorMessage ? (
                <FormHelperText style={{ marginBottom: '1rem' }} error>
                  {errorMessage}
                </FormHelperText>
              ) : null}
              {loading ? <CircularProgress color="primary" /> : (
                <StyledButton
                  disabled={!valid}
                  type="submit"
                >
                  Log in
                </StyledButton>
              )}
              <StyledButton
                disabled={!valid}
                filled
              >
                Register
              </StyledButton>
            </form>
            <div>
              <Button onClick={() => push('/signup')} color="primary" type="button">
                Sign Up
              </Button>
              <br />
              <Button onClick={() => push('/forgotpassword')} color="primary" type="button">
                Forgot Password
              </Button>
            </div>
          </div>
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
  return {
    auth: state.auth.authenticated,
    errorMessage: state.auth.errorMessage,
    loading: state.auth.loading,
  };
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
  valid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  errorMessage: null,
};

export default reduxForm({
  validate,
  form: 'LoginForm',
})(
  connect(mapStateToProps, { login })(Login),
);
