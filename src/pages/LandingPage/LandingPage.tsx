import React, { Fragment } from 'react';
import MappedCards from '../../components/card/Cards';
import { Navbar } from '../../components/navbar';


const LandingPage: React.FC = () => {
 

  return (
    <Fragment>
        <Navbar />
        <MappedCards />
    </Fragment>
  );
};

export default LandingPage;
