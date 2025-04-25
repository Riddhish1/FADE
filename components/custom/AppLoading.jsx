'use client';
import React from 'react';
import Image from 'next/image';

function AppLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      <div className="relative">
        <div className="w-24 h-24 relative overflow-hidden rounded-xl glow-border">
          <Image
            src="/fade-logo.svg"
            alt="FADE"
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
        <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <h2 className="mt-6 text-xl font-semibold text-white">Loading FADE</h2>
      <p className="text-slate-400 text-sm mt-2">Setting up your environment...</p>
    </div>
  );
}

export default AppLoading; 