import ChatView from '@/components/custom/ChatView'
import CodeView from '@/components/custom/CodeView'
import React from 'react'

function Workspace() {
  return (
    <div className='min-h-screen p-6 relative z-10'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1800px] mx-auto'>
        <div className='lg:col-span-1'>
          <ChatView />
        </div>
        <div className='lg:col-span-2'>
          <CodeView />
        </div>
      </div>
    </div>
  )
}

export default Workspace