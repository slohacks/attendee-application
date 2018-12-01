import React from 'react';
import Scenic from '../components/Scenic';

const NotFound = () => (
  <div className="container">
    <div className="subContainer">
      <Scenic />
    </div>
    <div className="subContainer">
      <div className="containerPadding">
        <h1>
          404 Page Not Found
        </h1>
        <p>
          Hi friend! We couldn&apos;t find the page you were looking for.
        </p>
      </div>
    </div>
  </div>
);

export default NotFound;
