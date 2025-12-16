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
    <header className="sticky top-0 z-50 py-4 px-6 flex justify-between items-center bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20">
      <Link href={'/'} className="flex items-center gap-3 group">
        <div className="relative w-11 h-11 flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-105">
          <Image 
            src={'/fade-logo.svg'} 
            alt="FADE logo" 
            width={40} 
            height={40} 
            className="object-contain group-hover:scale-110 transition-transform duration-300" 
          />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 text-transparent bg-clip-text group-hover:from-indigo-300 group-hover:to-purple-400 transition-all duration-300">
          FADE
        </span>
      </Link>
      
      <div className="flex items-center gap-3">
        {pathname.includes('/workspace/') && (
          <>
            <div className="text-sm text-slate-400 mr-2 hidden md:block bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
              <span className="token-display font-medium">
                <span className="text-indigo-400">{userDetail?.token || 50000}</span> tokens
              </span>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => onActionBtn('export')}
              className="text-slate-300 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/50 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button
              onClick={() => onActionBtn('deploy')}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 active:scale-95 border-0"
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
            width={40}
            height={40}
            className="rounded-full cursor-pointer object-cover border-2 border-slate-700/50 ml-2 hover:border-indigo-500/70 transition-all duration-300 hover:scale-105 shadow-lg"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
