'use client';
import { ActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import React, { useContext, useEffect, useRef, useState } from 'react';

function SandpackPreviewClient({ onPreviewReady }) {
  const previewRef = useRef();
  const { sandpack } = useSandpack();
  const { action, setAction } = useContext(ActionContext);
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  
  // Handle actions like deploy or export
  useEffect(() => {
    if (action?.actionType) {
      getSandpackClient();
    }
  }, [sandpack, action]);
  
  // Handle preview ready state
  useEffect(() => {
    const client = previewRef.current?.getClient();
    
    if (client) {
      // Listen for preview ready event
      const unsubscribe = client.listen((message) => {
        if (message.type === 'start' || message.type === 'done') {
          setIsPreviewReady(true);
          onPreviewReady && onPreviewReady();
        }
      });
      
      // Check if already ready
      client.iframe.addEventListener('load', () => {
        setIsPreviewReady(true);
        onPreviewReady && onPreviewReady();
      });
      
      return () => {
        unsubscribe && unsubscribe();
      };
    }
  }, [sandpack, onPreviewReady]);
  
  const getSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      try {
        const result = await client.getCodeSandboxURL();
        if (action?.actionType === "deploy") {
          window.open('https://' + result?.sandboxId + ".csb.app/");
        } else if (action?.actionType === "export") {
          window?.open(result?.editorUrl);
        }
      } catch (error) {
        console.error("Error accessing sandbox URL:", error);
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <SandpackPreview
        ref={previewRef}
        showNavigator={true}
        showRefreshButton={true}
        showOpenInCodeSandbox={true}
        actionsChildren={
          <div className="flex items-center">
            {!isPreviewReady && (
              <span className="text-xs text-slate-400 flex items-center">
                <div className="w-3 h-3 rounded-full border-t-2 border-indigo-500 animate-spin mr-2"></div>
                Loading preview...
              </span>
            )}
          </div>
        }
        style={{ height: '80vh' }}
      />
    </div>
  );
}

export default SandpackPreviewClient;
