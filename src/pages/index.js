// pages/index.js
import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/sections/HeroSection';
import PopularCoursesSection from '../components/sections/PopularCoursesSection';

const Home = () => {
  return (
    <>
      <Header />
      <main style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <HeroSection />
        <PopularCoursesSection style={{ flex: 1 }} />
      </main>
    </>
  );
};

export default Home;
