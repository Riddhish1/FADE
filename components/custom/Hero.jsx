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
      <div className="flex flex-col items-center gap-4">
        <h2 className="hero-title flex items-center gap-2">
          <Sparkles className="h-10 w-10 text-indigo-400" />
          {Lookup.HERO_HEADING}
        </h2>
        <p className="hero-subtitle">{Lookup.HERO_DESC}</p>
        
        <div className="home-input-container w-full max-w-2xl mt-3">
          <div className="flex gap-3 w-full">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="home-input h-32 max-h-56 resize-none"
              onChange={(event) => setUserInput(event.target.value)}
            />
          </div>
          
          {userInput && (
            <div className="flex justify-end mt-3">
              <button 
                onClick={() => onGenerate(userInput)}
                className="button-primary flex items-center gap-2"
              >
                Generate <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3">
          {Lookup.SUGGESTIONS.map((suggestion, index) => (
            <button
              className="fade-button-outline text-sm py-1.5 px-3 rounded-full hover:scale-105 transition-transform"
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
