'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Rocket, Menu } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  
  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now()
    })
  }
  
  return (
    <header className="py-3 px-6 flex justify-between items-center bg-slate-900 border-b border-slate-800">
      <Link href={'/'} className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center glow-border rounded-lg overflow-hidden">
          <Image 
            src={'/fade-logo.svg'} 
            alt="FADE logo" 
            width={40} 
            height={40} 
            className="object-contain hover:scale-110 transition-transform duration-300" 
          />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text">
          FADE
        </span>
      </Link>
      
      <div className="flex items-center gap-3">
        {pathname.includes('/workspace/') && (
          <>
            <div className="text-sm text-slate-400 mr-2 hidden md:block">
              <span className="token-display">{userDetail?.token || 50000} tokens</span>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => onActionBtn('export')}
              className="text-slate-300 hover:text-indigo-300 hover:bg-slate-800"
            >
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button
              onClick={() => onActionBtn('deploy')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              <Rocket className="w-4 h-4 mr-2" /> Deploy
            </Button>
          </>
        )}
        
        {userDetail && (
          <Image
            onClick={toggleSidebar}
            src={userDetail?.picture || "https://via.placeholder.com/40"}
            alt="User"
            width={36}
            height={36}
            className="rounded-full cursor-pointer object-cover border border-slate-700 ml-2 hover:border-indigo-500 transition-colors"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
