'use client';
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import React, { useContext } from 'react';
import { Zap } from 'lucide-react';

function Pricing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  
  return (
    <div className="w-full">
      <div className="text-center pt-10 pb-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-3">
          Pricing Plans
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Choose the perfect plan for your AI-powered code generation needs
        </p>
      </div>
      
      {userDetail?.token && (
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div className="p-6 bg-slate-800/70 border border-slate-700 rounded-xl w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Your current balance</p>
                <h2 className="text-xl font-bold text-white">
                  {userDetail?.token?.toLocaleString()} <span className="text-indigo-300">Tokens</span>
                </h2>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h3 className="text-white font-medium">Need more tokens?</h3>
              <p className="text-slate-400 text-sm">Choose from one of our plans below</p>
            </div>
          </div>
        </div>
      )}
      
      <PricingModel />
    </div>
  );
}

export default Pricing;
