import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { SectionHeaderContainer } from '../styled/containers';
import { SectionHeader, SectionText } from '../styled/headers';
import { forgotPasswordConfirm } from '../actions/index';
import TextInput from './InputTypes/2019/TextInput';
import { StyledButton } from './common';

class ConfirmPasswordForm extends Component {
  onSubmit(values) {
    const { token, forgotPasswordConfirm: forgotPasswordConfirmAction } = this.props;
    forgotPasswordConfirmAction(values, token);
  }

  render() {
    const {
      handleSubmit,
      valid,
    } = this.props;
    return (
      <Fragment>
        <SectionHeaderContainer>
          <SectionHeader>Confirm Password</SectionHeader>
          <SectionText>Please fill out the fields below to change your password.</SectionText>
        </SectionHeaderContainer>
        <StyledForm onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Enter a password (8 or more characters)"
            name="password"
            type="password"
            placeholder="Password"
            component={TextInput}
          />

          <Field
            label="Confirm Password"
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            component={TextInput}
          />
          <div>
            <StyledButton filled disabled={!valid} type="submit">
              Change Password
            </StyledButton>
          </div>
        </StyledForm>
      </Fragment>
    );
  }
}

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;

function validate(values) {
  const errors = {};

  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 characters or more';
  }
  if (!values.confirm_password) {
    errors.confirm_password = 'Confirm Password required';
  } else if (values.confirm_password.length < 8) {
    errors.confirm_password = 'Confirm Password must be 8 characters or more';
  } else if (values.confirm_password.localeCompare(values.password)) {
    errors.confirm_password = 'Passwords do not match';
  }

  return errors;
}


ConfirmPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  forgotPasswordConfirm: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: 'ConfirmPasswordForm',
})(
  connect(null, { forgotPasswordConfirm })(ConfirmPasswordForm),
);
