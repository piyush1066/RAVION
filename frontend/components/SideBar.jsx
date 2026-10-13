import React, { useEffect, useState } from 'react'
import { MessageSquare, PanelLeft, PenBoxIcon, Plus } from "lucide-react"
import { getConversation } from '../src/features/getConversations'
import { useDispatch, useSelector } from "react-redux"
import { addConversation, setConversations, setSelectedConversation } from '../src/redux/conversationSlice'
import { createConversation } from '../src/features/createConversation.js'

function SideBar() {
  const [collapse, setCollapse] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const getCon = async () => {
      const data = await getConversation()
      dispatch(setConversations(data))
    }
    getCon()
  }, [])

  const handleCreateConversation = async () => {
    const data = await createConversation()
    dispatch(addConversation(data))
  }

  const { conversations, selectedconversation } = useSelector(
    state => state.conversation
  )

  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]">
      <div className="flex flex-col h-full">
        {/* //HeaderDiv */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
          <div className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 border-none cursor-pointer hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent"
            onClick={() => setCollapse(true)}>
            <PanelLeft />

          </div>
          <span className='text-[16px] font-semibold text-slate-100 tracking-tight flex-1'>
            RAVION
          </span>
          <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>free</span>
          <button className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 border-none cursor-pointer hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent'
            onClick={() => {
              handleCreateConversation();
            }}
          ><PenBoxIcon size={14} /></button>


        </div>

        {/* new chat */}
        <div className='px-4 pt-4 pb-1'>
          <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700  rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
            onClick={() => handleCreateConversation()}><Plus size={15}
            />New Chat</button>

        </div>

        {/* conversations */}
        {conversations.length === 0 ?
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            No Recent Conversations
          </div>
          :
          (
            <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">Recents</div>
          )}

        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {
            conversations.map((conv, i) => {
              const isActive = selectedconversation?._id === conv?._id;

              return (
                <div
                  onClick={() => dispatch(setSelectedConversation(conv))}
                  key={conv._id}
                  className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${isActive
                    ? "bg-indigo-500/10 border-indigo-500/20"
                    : "bg-transparent border-transparent"
                    }`}
                >
                  <MessageSquare />
                  <span>{conv?.title || "New Chat"}</span>
                </div>
              );
            })
          }

        </div>
      </div>
    </div>
  )
}

export default SideBar
