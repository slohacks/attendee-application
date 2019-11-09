import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PageContainer, SectionHeaderContainer } from '../styled/containers';
import { SectionHeader, SectionText } from '../styled/headers';

const ConfirmPasswordStatus = ({ status }) => (
  <PageContainer>
    <ConfirmPasswordStatusContainer>
      {
        status
          ? (
            <SectionHeaderContainer>
              <SectionHeader>Password Change Confirmed</SectionHeader>
              <SectionText>
                Please proceed to login by using the link below.
              </SectionText>
              <Link to="/login">Back to login</Link>
            </SectionHeaderContainer>
          )
          : (
            <SectionHeaderContainer>
              <SectionHeader>Password Change Failed</SectionHeader>
              <SectionText>
                Please create another forgot password request to change password.
              </SectionText>
              <Link to="/forgot-password">Back to login</Link>
            </SectionHeaderContainer>
          )
      }
    </ConfirmPasswordStatusContainer>
  </PageContainer>
);

const ConfirmPasswordStatusContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

ConfirmPasswordStatus.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default ConfirmPasswordStatus;
