import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Explainer } from './components/Explainer';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      
      <main>
        <Hero />
        <Explainer />
        <Features />
        <HowItWorks />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}

export default App;
