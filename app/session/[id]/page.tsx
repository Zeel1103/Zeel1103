'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MessageList from '@/components/MessageList'
import VoiceRecorder from '@/components/VoiceRecorder'
import { Button } from '@/components/ui/button'
import { Message } from '@/types'
import { AIDoctorAgents } from '@/shared/list'
import { Send, X, FileText, Pill, ArrowLeft, Phone, Video } from 'lucide-react'
import Link from 'next/link'

export default function SessionPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params?.id as string
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [doctorSpecialist, setDoctorSpecialist] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [ended, setEnded] = useState(false)
  const [recommendedMeds, setRecommendedMeds] = useState<string[]>([])
  const [typedProblem, setTypedProblem] = useState('')

  const doctor = AIDoctorAgents.find(d => d.specialist === doctorSpecialist)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/messages/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      if (!res.ok) return
      const data = await res.json()
      setMessages(data.messages)
      setDoctorSpecialist(data.doctorSpecialist || null)
      extractMedicines(data.messages)
    }
    if (sessionId) fetchData()
  }, [sessionId])

  const extractMedicines = (msgs: Message[]) => {
    const medRegex = /\b(Paracetamol|Ibuprofen|ORS|Cough Syrup|Antacid|Cetirizine|Amoxicillin|Vitamin C|Electrolyte Solution)\b/gi
    const meds = new Set<string>()
    msgs.forEach(msg => {
      if (msg.sender === 'ai') {
        const matches = msg.content.match(medRegex)
        matches?.forEach(m => meds.add(m))
      }
    })
    setRecommendedMeds(Array.from(meds))
  }

  const handleSendMessage = async (text: string | null) => {
    if (!text || ended) return
    setLoading(true)
    const userMsg: Message = { sessionId, sender: 'user', content: text, createdAt: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)
    try {
      const res = await fetch('/api/messages/ai-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      })
      if (!res.ok) {
        const errorMsg: Message = { sessionId, sender: 'ai', content: '❌ Error: Failed to get a response. Please try again.', createdAt: new Date().toISOString() }
        setMessages(prev => [...prev, errorMsg])
        return
      }
      const data = await res.json()
      const aiMsg: Message = { sessionId, sender: 'ai', content: data.reply || '...', createdAt: new Date().toISOString() }
      setMessages(prev => { const updated = [...prev, aiMsg]; extractMedicines(updated); return updated; })
    } catch (err) {
      const errorMsg: Message = { sessionId, sender: 'ai', content: '❌ Network Error: Could not connect.', createdAt: new Date().toISOString() }
      setMessages(prev => [...prev, errorMsg])
    } finally { setLoading(false); setIsTyping(false); }
  }

  const handleEndChat = () => { setEnded(true); router.push(`/session/${sessionId}/result`); }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      {doctor && (
        <div className="bg-white border-b border-gray-100 shadow-sm z-10">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <button className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <ArrowLeft className="w-4 h-4 text-gray-600" />
                </button>
              </Link>
              <img src={doctor.image} alt={doctor.specialist} className="w-12 h-12 rounded-2xl border-2 border-sky-100 shadow-sm object-cover" />
              <div>
                <h1 className="text-base font-bold text-gray-900">{doctor.specialist}</h1>
                <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  Online • AI Specialist
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleEndChat} disabled={ended} className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-all">
                End Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer Banner */}
      {messages.length === 0 && (
        <div className="max-w-4xl mx-auto w-full px-6 pt-6">
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-center">
            <p className="text-sm text-sky-700">
              🩺 This is an <strong>AI medical consultation</strong>. For emergencies, call your local emergency number immediately.
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          <MessageList messages={messages} doctorSpecialist={doctorSpecialist} />

          {isTyping && (
            <div className="flex items-center gap-3 mt-4">
              <img src={doctor?.image || '/doctor1.png'} alt="Doctor" className="w-8 h-8 rounded-xl border border-gray-100" />
              <div className="bg-white rounded-2xl rounded-bl-sm px-5 py-3 shadow-sm border border-gray-100">
                <span className="text-gray-500 text-sm flex items-center gap-2">
                  Dr. AI is analyzing
                  <span className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Recommended Medicines */}
      {recommendedMeds.length > 0 && (
        <div className="bg-emerald-50 border-t border-emerald-100 px-6 py-3 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3 overflow-x-auto">
            <Pill className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-xs font-semibold text-emerald-700 flex-shrink-0">Mentioned:</span>
            {recommendedMeds.map((med, idx) => (
              <span key={idx} className="bg-white border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                {med}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      {!ended && (
        <div className="bg-white border-t border-gray-100 px-6 py-4 max-w-4xl mx-auto w-full">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <textarea
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100 transition resize-none text-sm"
                placeholder="Type your symptoms or questions..."
                value={typedProblem}
                onChange={(e) => setTypedProblem(e.target.value)}
                rows={2}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (typedProblem.trim()) { handleSendMessage(typedProblem); setTypedProblem(''); } } }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { if (typedProblem.trim()) { handleSendMessage(typedProblem); setTypedProblem(''); } }}
                disabled={!typedProblem.trim() || loading}
                className="btn-primary p-3 rounded-xl disabled:opacity-40 disabled:transform-none disabled:shadow-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-3">
            <VoiceRecorder onTranscription={handleSendMessage} />
          </div>
        </div>
      )}

      {/* Chat Ended */}
      {ended && (
        <div className="bg-white border-t border-gray-100 px-6 py-8 text-center">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-emerald-500" />
          </div>
          <p className="text-gray-800 font-semibold mb-3">Consultation Complete</p>
          <button onClick={() => router.push(`/session/${sessionId}/result`)} className="btn-primary text-sm px-6 py-2.5 rounded-xl">
            View Results & Prescription
          </button>
        </div>
      )}
    </div>
  )
}