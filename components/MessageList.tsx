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
          {/* AI doctor avatar */}
          {msg.sender === 'ai' && (
            <img 
              src={doctor?.image || '/doctor1.png'} 
              alt="Doctor" 
              className="w-9 h-9 rounded-full border-2 border-blue-300 flex-shrink-0 shadow-sm" 
            />
          )}

          {/* Message bubble */}
          <div className="flex flex-col gap-1 max-w-md">
            <div
              className={`px-4 py-3 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
            <span className={`text-xs text-gray-400 px-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* User avatar */}
          {msg.sender === 'user' && (
            <div className="w-9 h-9 flex-shrink-0">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MessageList
