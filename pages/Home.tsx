import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Audit from '../components/Audit';
import Process from '../components/Process';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Clients />
      <Testimonials />
      <Audit />
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;