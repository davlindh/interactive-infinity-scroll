import { useRef, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';
import ParallaxSection from '../components/ParallaxSection';

const Index = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;

          if (scrollPosition >= sectionTop - windowHeight / 2 && scrollPosition < sectionBottom - windowHeight / 2) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          } else {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ParallaxSection />
      <div ref={(el) => (sectionsRef.current[0] = el)} className="transition-all duration-1000">
        <AboutSection />
      </div>
      <div ref={(el) => (sectionsRef.current[1] = el)} className="transition-all duration-1000">
        <FeaturesSection />
      </div>
      <div ref={(el) => (sectionsRef.current[2] = el)} className="transition-all duration-1000">
        <GallerySection />
      </div>
      <div ref={(el) => (sectionsRef.current[3] = el)} className="transition-all duration-1000">
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;