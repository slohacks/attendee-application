import React from 'react';
import logo from '../assets/logo-white.png';
import theme from '../assets/theme.png';

const Scenic = () => (
  <div id="scenic" className="scenic">
    <section className="scenicContainer">
      <div className="scenicNav">
        <div className="scenicLogo">
          <a href="https://www.slohacks.com">
            <img src={logo} alt="SLO Hacks" />
          </a>
        </div>
      </div>
      <div className="scenicContent">
        <div className="scenicTheme">
          <img src={theme} alt="Small Town, Big Ideas" />
        </div>
      </div>
    </section>
  </div>
);

export default Scenic;
