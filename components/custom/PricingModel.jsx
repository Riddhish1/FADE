'use client';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Check, Sparkles, Zap } from 'lucide-react';

function PricingModel() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const UpdateUserToken = useMutation(api.auth.UpdateUserToken);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isYearly, setIsYearly] = useState(false);

  const onUpgrade = async (value, price, name) => {
    if (!userDetail?.name) {
      router.push('/');
      return;
    }
    
    setSelectedPlan(name);
    
    try {
      await UpdateUserToken({
        userId: userDetail._id,
        token: value,
      });
      toast.success(`Successfully upgraded to ${name} plan!`, {
        description: `Your account has been credited with ${value.toLocaleString()} tokens.`
      });
    } catch (error) {
      toast.error('Failed to upgrade plan', {
        description: 'Please try again or contact support if the issue persists.'
      });
    } finally {
      setTimeout(() => setSelectedPlan(null), 1500);
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="mt-6 inline-flex items-center p-1 bg-slate-800 rounded-full">
          <button 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isYearly ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isYearly ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            onClick={() => setIsYearly(true)}
          >
            Yearly <span className="text-xs font-normal ml-1 text-emerald-400">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Lookup.PRICING_OPTIONS.map((option, index) => {
          const isPopular = option.name === 'Pro';
          const yearlyPrice = isYearly ? (option.price * 0.8 * 12).toFixed(2) : null;
          const price = isYearly ? (option.price * 0.8).toFixed(2) : option.price.toFixed(2);
          
          return (
            <div 
              className={`pricing-card relative ${isPopular ? 'transform scale-105 border-indigo-500/50 shadow-lg shadow-indigo-500/20' : ''}`} 
              key={index}
            >
              {isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="pricing-card-header">
                <div className="text-lg font-semibold text-indigo-300 mb-2">{option.name}</div>
                <div className="pricing-price">
                  <span>${price}</span>
                  <span className="text-sm text-gray-400 font-normal">/{isYearly ? 'mo' : 'month'}</span>
                </div>
                {isYearly && (
                  <div className="text-xs text-indigo-300 mt-1">
                    ${yearlyPrice} billed yearly
                  </div>
                )}
                <div className="text-purple-300 text-sm mt-2 font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-yellow-400" />
                  {option.tokens} tokens
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-sm text-gray-400 mb-5">{option.desc}</p>
                
                {option.features && (
                  <div className="mt-4 mb-6">
                    <ul className="space-y-3">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-300">
                          <Check className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <button 
                  className={`pricing-btn w-full mt-2 flex items-center justify-center gap-2 ${
                    selectedPlan === option.name ? 'bg-emerald-600 hover:bg-emerald-700' : ''
                  }`}
                  onClick={() => onUpgrade(option.value, option.price, option.name)}
                  disabled={userDetail?.token >= option.value || selectedPlan !== null}
                >
                  {selectedPlan === option.name ? (
                    <>
                      <Check className="h-4 w-4" /> Upgraded!
                    </>
                  ) : (
                    <>
                      Upgrade to {option.name}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 bg-slate-800/50 border border-slate-700 rounded-xl p-6 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-white">Need a custom plan?</h3>
        <p className="text-slate-400 mb-4">
          If you need a custom solution for your team or enterprise, we're here to help.
          Contact our sales team to discuss your specific requirements.
        </p>
        <Button className="bg-white text-slate-900 hover:bg-slate-100">
          Contact Sales
        </Button>
      </div>
    </div>
  );
}

export default PricingModel;
