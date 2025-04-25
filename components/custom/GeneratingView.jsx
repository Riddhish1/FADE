'use client';
import React from 'react';
import { Code } from 'lucide-react';

function GeneratingView() {
  return (
    <div className="generating-container">
      <div className="loading-spinner"></div>
      <h2 className="generating-text">Generating your code</h2>
      <p className="generating-subtext">This might take a few moments...</p>
      
      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center p-4">
          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3">
            <Code className="h-6 w-6 text-indigo-400" />
          </div>
          <span className="text-sm text-gray-400">Analyzing request</span>
        </div>
        
        <div className="h-0.5 w-10 bg-slate-800"></div>
        
        <div className="flex flex-col items-center p-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-3">
            <svg className="h-6 w-6 text-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm text-slate-600">Generating code</span>
        </div>
        
        <div className="h-0.5 w-10 bg-slate-800"></div>
        
        <div className="flex flex-col items-center p-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-3">
            <svg className="h-6 w-6 text-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm text-slate-600">Complete</span>
        </div>
      </div>
    </div>
  );
}

export default GeneratingView; 