'use client';
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MessageCircleCode, PlusCircle } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';
import Link from 'next/link';

function AppSideBar() {
  return (
    <Sidebar className="border-r border-slate-800">
      <SidebarHeader className="p-4 border-b border-slate-800">
        <Link href={'/'} className="flex items-center gap-2 mb-4">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden">
            <Image 
              src={'/fade-logo.svg'} 
              alt="FADE logo" 
              width={32} 
              height={32} 
              className="object-contain" 
            />
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text">
            FADE
          </span>
        </Link>
        
        <Button 
          className="w-full justify-start gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <PlusCircle className="h-4 w-4" /> Start New Chat
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto border-t border-slate-800">
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
