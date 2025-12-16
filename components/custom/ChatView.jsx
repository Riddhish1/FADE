'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSidebar } from '../ui/sidebar';
import { toast } from 'sonner';

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  /**
   * Used to Get Workspace data using Workspace ID
   */
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
  };
  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    // return;
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    console.log({ PROMPT });
    const result = await axios.post('/api/ai-chat', {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    const aiResp = {
      role: 'ai',
      content: result.data.result,
    };
    setMessages((prev) => [...prev, aiResp]);
    
    // update token to database

    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });
    console.log("LEN", countToken(JSON.stringify(aiResp)));
    const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
    setUserDetail(prev=>( {...prev, token: token}))
    await UpdateToken({
      token: token,
      userId: userDetail?._id
    })

    setLoading(false);
  };

  const onGenerate = (input) => {
    if(userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return ;

    }
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setUserInput('');
  };

  return (
    <div className="relative h-[85vh] flex flex-col bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-4">
        {messages?.length > 0 && messages?.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl flex gap-3 items-start leading-7 transition-all duration-300 hover:scale-[1.01] ${
              msg?.role === 'user' 
                ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20' 
                : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50'
            }`}
          >
            {msg?.role == 'user' && (
              <Image
                src={userDetail?.picture}
                alt="userImage"
                width={36}
                height={36}
                className="rounded-full ring-2 ring-indigo-500/30"
              />
            )}
            {msg?.role == 'ai' && (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                AI
              </div>
            )}
            <ReactMarkdown className="flex-1 text-slate-100 prose prose-invert max-w-none">
              {msg?.content}
            </ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="p-4 rounded-xl flex gap-3 items-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50">
            <Loader2Icon className="animate-spin text-indigo-400" />
            <h2 className="text-slate-300">Generating response...</h2>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/60 backdrop-blur-sm">
        <div className="flex gap-3 items-end">
          {userDetail && (
            <Image
              onClick={toggleSidebar}
              src={userDetail?.picture}
              alt="userImage"
              width={36}
              height={36}
              className="rounded-full cursor-pointer ring-2 ring-slate-700 hover:ring-indigo-500/50 transition-all"
            />
          )}
          <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-1 backdrop-blur-sm hover:border-indigo-500/30 transition-all focus-within:border-indigo-500/50 focus-within:shadow-lg focus-within:shadow-indigo-500/10">
            <div className="flex gap-2 items-end">
              <textarea
                placeholder={Lookup.INPUT_PLACEHOLDER}
                className="outline-none bg-transparent w-full h-24 max-h-40 resize-none p-3 text-slate-100 placeholder:text-slate-500"
                onChange={(event) => setUserInput(event.target.value)}
                value={userInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && userInput) {
                    e.preventDefault();
                    onGenerate(userInput);
                  }
                }}
              />
              {userInput && (
                <button
                  onClick={() => onGenerate(userInput)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 p-2.5 rounded-lg cursor-pointer transition-all shadow-lg hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 m-2"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
