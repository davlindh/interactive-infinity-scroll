import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from 'framer-motion';

const themes = [
  {
    name: 'Nature',
    layers: [
      '/images/nature-bg.png',
      '/images/nature-mid.png',
      '/images/nature-fg.png',
    ],
  },
  {
    name: 'Cityscape',
    layers: [
      '/images/city-bg.png',
      '/images/city-mid.png',
      '/images/city-fg.png',
    ],
  },
  {
    name: 'Space',
    layers: [
      '/images/space-bg.png',
      '/images/space-mid.png',
      '/images/space-fg.png',
    ],
  },
];

const ParallaxSection = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const changeTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length);
  };

  useEffect(() => {
    // Force a re-render when the theme changes
    sectionRef.current.style.display = 'none';
    setTimeout(() => {
      sectionRef.current.style.display = 'block';
    }, 0);
  }, [currentTheme]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] overflow-hidden">
      <div className="sticky top-0 h-screen flex">
        {[0.7, 1.5, 1.2].map((speed, index) => (
          <ParallaxColumn 
            key={index} 
            theme={themes[currentTheme]} 
            scrollYProgress={scrollYProgress} 
            speed={speed} 
            layerIndex={index}
          />
        ))}
      </div>
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg pointer-events-auto">
          <h2 className="text-4xl font-bold mb-4">Parallax Scrolling</h2>
          <p className="text-xl mb-8">Experience the magic of depth and motion</p>
          <Button onClick={changeTheme} variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black transition-colors">
            Change Theme
          </Button>
        </div>
      </div>
    </section>
  );
};

const ParallaxColumn = ({ theme, scrollYProgress, speed, layerIndex }) => {
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${100 * speed}%`]);

  return (
    <div className="w-1/3 h-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${theme.layers[layerIndex]})`,
          y,
        }}
      />
    </div>
  );
};

export default ParallaxSection;