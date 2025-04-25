'use client';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useSidebar } from '../ui/sidebar';
import { Code, MessageSquare } from 'lucide-react';

function WorkspaceHistory() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [workspaceList, setWorkSpaceList] = useState();
  const convex = useConvex();
  const { toggleSidebar } = useSidebar();
  
  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    setWorkSpaceList(result);
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-sm uppercase text-slate-400 tracking-wider">Your Chats</h2>
      
      <div className="space-y-1">
        {workspaceList && workspaceList.length > 0 ? (
          workspaceList.map((workspace, index) => (
            <Link 
              key={index} 
              href={'/workspace/' + workspace?._id}
              className="group flex items-start gap-2 p-2 rounded-md hover:bg-slate-800/60 transition-colors"
            >
              <Code className="h-4 w-4 mt-0.5 text-indigo-400 flex-shrink-0" />
              <span 
                onClick={toggleSidebar} 
                className="text-sm text-slate-300 line-clamp-2 group-hover:text-white transition-colors"
              >
                {workspace?.messages[0]?.content}
              </span>
            </Link>
          ))
        ) : (
          <div className="text-sm text-slate-500 italic p-2">
            No chat history yet
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkspaceHistory;
