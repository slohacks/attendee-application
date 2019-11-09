import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BackgroundImg from '../assets/blue_pattern.png';

const Layout = ({ children }) => (
  <LayoutContainer>
    <LayoutBackground />
    <LayoutContent>
      <LayoutRow>
        <h1>Application System</h1>
      </LayoutRow>
      <LayoutView>
        {children}
      </LayoutView>
    </LayoutContent>
  </LayoutContainer>
);

const LayoutContainer = styled.div`
  position: relative;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-areas: '. content .';
  grid-template-columns: 2fr 8fr 2fr;
  align-content: center;
`;

const LayoutBackground = styled.div`
  background: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.3;
  position: absolute;
  top 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const LayoutView = styled.div`
  box-shadow: .25em 1em 10em -2em #000000;
  background: #ffffff;
  min-height: 500px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutContent = styled.div`
  grid-area: content;
  z-index: 5;
`;

const LayoutRow = styled.div`
  padding-bottom: 1rem;

  h1 {
    color: #3e3e3e;
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
