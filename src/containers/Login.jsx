import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

import { PageContainer, SectionHeaderContainer } from '../styled/containers';
import { SectionHeader, SectionText } from '../styled/headers';
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
      <PageContainer>
        <SectionHeaderContainer>
          <SectionHeader>Welcome to the SLO Hacks 2020 application system!</SectionHeader>
          <SectionText>
            {`
             If you're applying to attend SLO Hacks 2020, go ahead and 
            `}
            <Link to="/signup">register for a new account</Link>
          </SectionText>
          <SectionText>If you&#39;re here to edit your application or check the status</SectionText>
        </SectionHeaderContainer>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <LoginFormContainer>
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
              <FormHelperText error>
                {errorMessage}
              </FormHelperText>
            ) : null}
            <ButtonContainer>
              <BoxContainer>
                {loading ? <CircularProgress color="primary" /> : (
                  <StyledButton
                    disabled={!valid}
                    type="submit"
                  >
                    Log in
                  </StyledButton>
                )}
              </BoxContainer>
              <BoxContainer>
                <StyledButton
                  filled
                  onClick={() => push('/signup')}
                >
                  Register
                </StyledButton>
              </BoxContainer>
              <div>
                <Link to="/forgot-password">Forgot Password</Link>
              </div>
            </ButtonContainer>
          </LoginFormContainer>
        </form>
      </PageContainer>
    );
  }
}

const LoginFormContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
`;

const BoxContainer = styled.div`
  width: 150px;
`;

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
