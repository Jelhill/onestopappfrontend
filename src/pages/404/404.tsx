import React from 'react';
import { Navbar } from '../../components/navbar';
import NotFoundView from './not-found-view';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <NotFoundView />
    </>
  );
};

export default NotFoundPage;
