import React from 'react';
import MainLayout from '../views/MainLayout';
import Head from 'next/head';

const App: React.FC = () => {
  const PAGE_TITLE = "GTGInitiative";

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
      </Head>
      <div>
        <MainLayout />
      </div>
    </>
  );
};

export default App;
