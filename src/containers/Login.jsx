import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions/index';


class Login extends Component {
  onSubmit(values) {
    this.props.login(values); // eslint-disable-line react/destructuring-assignment
  }

  static renderField(field) {
    return (
      <div className="input-wrapper">
        <label htmlFor="value" className="label-field">
          {field.label}
          <input
            type={field.type}
            className="input-box"
            {...field.input}
          />
        </label>
        <div className="input-error">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Email"
            name="email"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Enter a password (8 or more characters)"
            name="password"
            type="password"
            component={this.renderField}
          />
          <button type="submit">
          Submit
          </button>

        </form>
        <div>
          <Link to="placeholder">
          Forgot Password
          </Link>
        </div>
        <div>
          <Link to="/signup">
            Create Account
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: 'LoginForm',
})(
  connect(null, { login })(Login),
);
