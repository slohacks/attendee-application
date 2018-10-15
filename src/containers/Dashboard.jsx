import React from 'react';
import { Link } from 'react-router-dom';
import requireAuth from '../components/requireAuth';

const Dashboard = () => (
  <div>
    <button type="button">
      Logout
    </button>
    <Link to="/questionnaire/0">
      Start application
    </Link>
  </div>
);

export default requireAuth(Dashboard);
