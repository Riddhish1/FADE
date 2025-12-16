'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Sparkles } from 'lucide-react';
import React, { useContext, useState } from 'react';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if(userDetail?.token < 10) {
      toast("You don't have enough tokens to generate code");
      return
    }
    const msg = {
      role: 'user',
      content: input,
    };
    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log(workspaceId);
    router.push('/workspace/' + workspaceId);
  };

  return (
    <div className="home-hero">
      <div className="flex flex-col items-center gap-5">
        <div className="inline-flex items-center gap-2 bg-slate-800/30 backdrop-blur-sm border border-indigo-500/20 px-4 py-2 rounded-full mb-2">
          <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
          <span className="text-sm text-slate-300 font-medium">AI-Powered Code Generation</span>
        </div>
        
        <h2 className="hero-title flex flex-col items-center gap-2">
          {Lookup.HERO_HEADING}
        </h2>
        <p className="hero-subtitle max-w-2xl">{Lookup.HERO_DESC}</p>
        
        <div className="home-input-container w-full max-w-3xl mt-4">
          <div className="flex gap-3 w-full">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="home-input h-36 max-h-60 resize-none"
              onChange={(event) => setUserInput(event.target.value)}
            />
          </div>
          
          {userInput && (
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => onGenerate(userInput)}
                className="button-primary flex items-center gap-2 group"
              >
                Generate 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        <div className="flex mt-10 flex-wrap max-w-3xl items-center justify-center gap-3">
          {Lookup.SUGGESTIONS.map((suggestion, index) => (
            <button
              className="text-sm py-2.5 px-5 rounded-full transition-all duration-300 bg-slate-800/40 border border-slate-700/50 text-slate-300 hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 hover:border-indigo-500/50 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 backdrop-blur-sm"
              key={index}
              onClick={() => onGenerate(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;
