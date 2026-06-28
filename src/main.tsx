import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Hero from './Hero';
import './index.css';

// Render the Hero section into #hero-root
const heroElement = document.getElementById('hero-root');
if (heroElement) {
  const heroRoot = createRoot(heroElement);
  heroRoot.render(
    <React.StrictMode>
      <Hero />
    </React.StrictMode>
  );
}

// Render the 3D card carousel into #react-carousel-root
const carouselElement = document.getElementById('react-carousel-root');
if (carouselElement) {
  const carouselRoot = createRoot(carouselElement);
  carouselRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
