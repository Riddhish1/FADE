'use client';
import React, { useContext, useEffect, useState } from 'react';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/MessagesContext';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Loader2Icon, Eye, Code } from 'lucide-react';
import { countToken } from './ChatView';
import { UserDetailContext } from '@/context/UserDetailContext';
import { toast } from 'sonner';
import SandpackPreviewClient from './SandpackPreviewClient';
import { ActionContext } from '@/context/ActionContext';
import GeneratingView from './GeneratingView';

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const [previewReady, setPreviewReady] = useState(false);
  const [autoSwitchToPreview, setAutoSwitchToPreview] = useState(true);

  useEffect(() => {
    (action?.actionType == 'deploy' || action?.actionType == 'export') &&
      setActiveTab('preview');
  }, [action]);

  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFils = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFils);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      console.log(messages);

      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    if (userDetail?.token < 10) {
      toast("You don't have enough tokens to generate code");
      return;
    }
    // reset preview state
    setPreviewReady(false);
    
    // Start loading
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + ' ' + Prompt.CODE_GEN_PROMPT;
    console.log({ PROMPT });
    
    try {
      const result = await axios.post('/api/gen-ai-code', {
        prompt: PROMPT,
      });

      console.log(result?.data);
      const aiResp = result.data;
      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
      setFiles(mergedFiles);
      
      await UpdateFiles({
        workspaceId: id,
        files: aiResp?.files,
      });
      
      // Deduct tokens
      const token =
        Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
      setUserDetail((prev) => ({ ...prev, token: token }));
      await UpdateToken({
        token: token,
        userId: userDetail?._id,
      });
      
      // Auto-switch to preview tab if setting is enabled
      if (autoSwitchToPreview) {
        setActiveTab('preview');
      }
      
      // Mark preview as ready
      setPreviewReady(true);
      
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Failed to generate code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle tabs with animation
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative code-editor rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 w-full p-4 border-b border-slate-700/50 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center shrink-0 bg-slate-800/50 p-1.5 px-2 gap-2 justify-center rounded-full border border-slate-700/50 shadow-inner">
          <button
            onClick={() => handleTabChange('code')}
            className={`text-sm cursor-pointer px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 font-medium ${
              activeTab == 'code' 
                ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }`}
          >
            <Code className="h-4 w-4" /> Editor
          </button>
          <button
            onClick={() => handleTabChange('preview')}
            className={`text-sm cursor-pointer px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 font-medium ${
              activeTab == 'preview' 
                ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            } ${
              previewReady && activeTab !== 'preview' 
                ? 'animate-pulse text-emerald-400' 
                : ''
            }`}
          >
            <Eye className="h-4 w-4" /> Preview
            {previewReady && activeTab !== 'preview' && (
              <span className="inline-block h-2 w-2 bg-emerald-400 rounded-full ml-1 animate-ping"></span>
            )}
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          {previewReady && (
            <div className="text-xs text-slate-400 hidden md:flex items-center">
              <input 
                type="checkbox" 
                id="autoPreview" 
                checked={autoSwitchToPreview} 
                onChange={(e) => setAutoSwitchToPreview(e.target.checked)}
                className="mr-1.5"
              />
              <label htmlFor="autoPreview" className="cursor-pointer">Auto-switch to preview</label>
            </div>
          )}
          
          {userDetail?.token && (
            <div className="text-sm text-slate-400">
              <span className="token-display">{userDetail?.token} tokens remaining</span>
            </div>
          )}
        </div>
      </div>
      
      {!loading ? (
        <SandpackProvider
          files={files}
          template="react"
          theme={'dark'}
          customSetup={{
            dependencies: {
              ...Lookup.DEPENDANCY,
            },
          }}
          options={{ externalResources: ['https://cdn.tailwindcss.com'] }}
        >
          <SandpackLayout>
            {activeTab == 'code' ? (
              <>
                <SandpackFileExplorer style={{ height: '80vh' }} />
                <SandpackCodeEditor style={{ height: '80vh' }} />
              </>
            ) : (
              <>
                <SandpackPreviewClient onPreviewReady={() => setPreviewReady(true)} />
              </>
            )}
          </SandpackLayout>
        </SandpackProvider>
      ) : (
        <GeneratingView />
      )}
    </div>
  );
}

export default CodeView;
