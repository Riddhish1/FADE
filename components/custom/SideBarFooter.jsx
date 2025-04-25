'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { UserDetailContext } from '@/context/UserDetailContext';

function SideBarFooter() {
  const router = useRouter();
  const { userDetail } = useContext(UserDetailContext);
  
  const options = [
    {
      name: 'Settings',
      icon: Settings,
      description: 'Customize your experience',
      path: '/settings',
    },
    {
      name: 'My Subscription',
      icon: Wallet,
      description: userDetail?.token ? `${userDetail.token} tokens remaining` : 'Manage your plan',
      path: '/pricing',
    },
    {
      name: 'Help Center',
      icon: HelpCircle,
      description: 'Get support and guidance',
      path: '/help',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
      description: 'Log out of your account',
      danger: true,
    },
  ];
  
  const onOptionClick = (option) => {
    if (option.path) {
      router.push(option.path);
    } else if (option.name === 'Sign Out') {
      // Handle sign out logic here
      console.log('Signing out');
    }
  };

  return (
    <div className="py-3 px-2">
      {options.map((option, index) => (
        <button
          onClick={() => onOptionClick(option)}
          key={index}
          className={`w-full flex items-start justify-between p-2 rounded-md text-left hover:bg-slate-800/60 mb-1 transition-colors ${
            option.danger ? 'text-red-400 hover:text-red-300' : 'text-slate-300 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <option.icon className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">{option.name}</p>
              {option.description && (
                <p className="text-xs text-slate-500">{option.description}</p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default SideBarFooter;
