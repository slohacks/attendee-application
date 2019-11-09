import React, { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ConfirmPasswordForm from '../components/ConfirmPasswordForm';
import ConfirmPasswordStatus from '../components/ConfirmPasswordStatus';
import { PageContainer } from '../styled/containers';
import { forgotPasswordVerify } from '../actions';

const ForgotPasswordVerification = ({ location: { search } }) => {
  const {
    verifyLoading,
    verifySuccess,
    confirmLoading,
    confirmSuccess,
  } = useSelector(state => state.passwordVerification);
  const dispatch = useDispatch();
  const token = search.replace('?token=', '');

  useEffect(() => {
    dispatch(forgotPasswordVerify(token));
  }, []);

  if (verifyLoading || confirmLoading) {
    return (
      <LoaderContainer>
        <ClipLoader size={150} />
      </LoaderContainer>
    );
  }

  if (verifySuccess === false || confirmSuccess === false) {
    return (
      <ConfirmPasswordStatus status={false} />
    );
  }

  if (confirmSuccess === true) {
    return (
      <ConfirmPasswordStatus status />
    );
  }

  return (
    <PageContainer>
      <ForgotPasswordVerificationContainer>
        <ConfirmPasswordForm token={token} />
      </ForgotPasswordVerificationContainer>
    </PageContainer>
  );
};

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ForgotPasswordVerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

ForgotPasswordVerification.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default ForgotPasswordVerification;
