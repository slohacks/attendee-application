import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { SectionHeader, SectionText } from '../styled/headers';
import { PageContainer, SectionHeaderContainer } from '../styled/containers';
import { StyledButton } from '../components/common';
import { emailVerification, resendEmailVerification } from '../actions';

const EmailVerification = ({ location: { search } }) => {
  const emailVerificationState = useSelector(state => state.emailVerification);
  const token = search.replace('?token=', '');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emailVerification(token));
  }, []);

  const resendVerification = () => {
    dispatch(resendEmailVerification(token));
  };

  if (emailVerificationState.loading) {
    return (
      <LoaderContainer>
        <ClipLoader size={150} />
      </LoaderContainer>
    );
  }

  return (
    <PageContainer>
      <EmailVerificationContainer>
        {
          emailVerificationState.success
            ? (
              <SectionHeaderContainer>
                <SectionHeader>Email Verfication Succeeded</SectionHeader>
                <SectionText>
                  Please proceed to login by using the link below.
                </SectionText>
                <Link to="/login">Back to login</Link>
              </SectionHeaderContainer>
            )
            : (
              <SectionHeaderContainer>
                <SectionHeader>Email Verfication Expired</SectionHeader>
                <SectionText>
                  Please request to resend an
                  email verification using the button below.
                </SectionText>
                {
                  emailVerificationState.resendLoading
                    ? <ClipLoader size={75} />
                    : <StyledButton onClick={resendVerification} type="button">Resend verification email</StyledButton>
                }
                {
                  emailVerificationState.resendComplete && (
                    <SectionText>
                      Check your email for a verification link to verify your account.
                    </SectionText>
                  )
                }
              </SectionHeaderContainer>
            )
        }
      </EmailVerificationContainer>
    </PageContainer>
  );
};

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const EmailVerificationContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

EmailVerification.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmailVerification;
