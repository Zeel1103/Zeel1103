'use client'

import React from 'react'
import { Message } from '@/types'
import { AIDoctorAgents } from '@/shared/list'
import { UserButton } from '@clerk/nextjs'

interface MessageListProps {
  messages: Message[]
  doctorSpecialist?: string | null
}

const MessageList: React.FC<MessageListProps> = ({ messages, doctorSpecialist }) => {
  const doctor = AIDoctorAgents.find(agent => agent.specialist === doctorSpecialist)

  return (
    <div className="space-y-4 pb-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {msg.sender === 'ai' && (
            <img 
              src={doctor?.image || '/doctor1.png'} 
              alt="Doctor" 
              className="w-8 h-8 rounded-xl border border-gray-100 flex-shrink-0 shadow-sm object-cover" 
            />
          )}

          <div className="flex flex-col gap-1 max-w-[75%]">
            <div
              className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-br-sm shadow-md shadow-sky-200/30' 
                  : 'bg-white text-gray-700 rounded-bl-sm border border-gray-100 shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
            <span className={`text-[10px] text-gray-400 px-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {msg.sender === 'user' && (
            <div className="w-8 h-8 flex-shrink-0">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MessageList
