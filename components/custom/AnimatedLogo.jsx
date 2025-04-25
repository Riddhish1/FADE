'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

function AnimatedLogo() {
  const logoRef = useRef(null);
  
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;
    
    // Add floating animation
    const floatAnimation = () => {
      let y = 0;
      let direction = 1;
      let rotation = 0;
      
      const animate = () => {
        // Gentle floating effect
        y += 0.05 * direction;
        if (y > 5) direction = -1;
        if (y < -5) direction = 1;
        
        // Subtle rotation
        rotation += 0.05;
        
        if (logo) {
          logo.style.transform = `translateY(${y}px) rotate(${Math.sin(rotation) * 2}deg)`;
        }
        requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    floatAnimation();
    
    // Add a subtle pulse glow effect
    const pulseInterval = setInterval(() => {
      if (logo) {
        logo.classList.add('glow-strong');
        setTimeout(() => {
          logo.classList.remove('glow-strong');
        }, 1000);
      }
    }, 4000);
    
    return () => {
      clearInterval(pulseInterval);
    };
  }, []);
  
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      <div 
        ref={logoRef}
        className="w-full h-full relative transition-transform duration-200 ease-in-out"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 animate-spin-slow blur-xl"></div>
        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden glow-border flex items-center justify-center">
          <Image
            src="/fade-logo.svg"
            alt="FADE"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
        
        {/* Code particles */}
        <div className="absolute -top-2 -right-2 h-3 w-3 bg-indigo-400 rounded-full animate-ping-slow opacity-75"></div>
        <div className="absolute bottom-4 -left-3 h-2 w-2 bg-purple-400 rounded-full animate-ping-slow opacity-75 animation-delay-1000"></div>
        <div className="absolute -bottom-2 right-5 h-2 w-2 bg-blue-400 rounded-full animate-ping-slow opacity-75 animation-delay-2000"></div>
      </div>
      
      {/* Reflection */}
      <div className="absolute bottom-0 left-0 right-0 mx-auto w-20 h-4 bg-indigo-600/20 blur-md rounded-full"></div>
    </div>
  );
}

export default AnimatedLogo; 