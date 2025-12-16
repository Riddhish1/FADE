'use client';
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import React, { useContext } from 'react';
import { Zap } from 'lucide-react';

function Pricing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  
  return (
    <div className="w-full min-h-screen py-12 px-4">
      <div className="text-center pt-6 pb-8">
        <div className="inline-flex items-center gap-2 bg-slate-800/30 backdrop-blur-sm border border-indigo-500/20 px-4 py-2 rounded-full mb-6">
          <Zap className="h-4 w-4 text-yellow-400" />
          <span className="text-sm text-slate-300 font-medium">Simple, Transparent Pricing</span>
        </div>
        
        <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 text-transparent bg-clip-text mb-4 animate-gradient">
          Pricing Plans
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Choose the perfect plan for your AI-powered code generation needs.
          <br />Scale as you grow with flexible token packages.
        </p>
      </div>
      
      {userDetail?.token && (
        <div className="max-w-5xl mx-auto px-4 mt-8 mb-8">
          <div className="p-6 bg-gradient-to-r from-slate-800/70 via-slate-800/50 to-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl w-full flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center mr-5 border border-indigo-500/20">
                <Zap className="h-7 w-7 text-indigo-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Your current balance</p>
                <h2 className="text-2xl font-bold text-white">
                  {userDetail?.token?.toLocaleString()} <span className="text-indigo-300 text-lg">Tokens</span>
                </h2>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h3 className="text-white font-semibold text-lg">Need more tokens?</h3>
              <p className="text-slate-400 text-sm">Choose from one of our plans below ↓</p>
            </div>
          </div>
        </div>
      )}
      
      <PricingModel />
    </div>
  );
}

export default Pricing;
