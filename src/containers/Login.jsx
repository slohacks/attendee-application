import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    const {
      handleSubmit,
      valid,
      errorMessage,
      loading,
      history: { push },
    } = this.props;
    return (
      <div>
        <h1>
          SLO Hacks 2019 Application
        </h1>
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
          {errorMessage ? (
            <FormHelperText style={{ marginBottom: '1rem' }} error>
              {errorMessage}
            </FormHelperText>
          ) : null}
          {loading ? <CircularProgress color="primary" /> : (
            <Button
              variant="outlined"
              color="primary"
              disabled={!valid}
              type="submit"
              style={{ marginBottom: '1rem' }}
            >
              Login!
            </Button>
          )}
        </form>

        <div>
          <Button onClick={() => push('/signup')} color="primary" type="button">
            Create Account
          </Button>

          <Button onClick={() => push('/lostpassword')} color="primary" type="button" style={{ marginLeft: '1rem' }}>
            Forgot Password
          </Button>
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

export default reduxForm({
  validate,
  form: 'LoginForm',
})(
  connect(mapStateToProps, { login })(Login),
);
