import React from 'react';
import requireAuth from '../components/requireAuth';

const Questionaire = () => (
  <div>
    <h1>
      Hello I am a questionaire
    </h1>
    <h2>
      Hello World
    </h2>
  </div>
);


export default requireAuth(Questionaire);
