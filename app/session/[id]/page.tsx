'use client'

import { useEffect, useState, useRef } from 'react' // 👈 Import useRef
import { useParams, useRouter } from 'next/navigation'
import MessageList from '@/components/MessageList'
import VoiceRecorder from '@/components/VoiceRecorder'
import { Button } from '@/components/ui/button'
import { Message } from '@/types'
import { AIDoctorAgents } from '@/shared/list'

export default function SessionPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params?.id as string
  const messagesEndRef = useRef<HTMLDivElement>(null) // 👈 Reference for scrolling

  const [messages, setMessages] = useState<Message[]>([])
  const [doctorSpecialist, setDoctorSpecialist] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)   // ✅ Typing state
  const [ended, setEnded] = useState(false)
  const [recommendedMeds, setRecommendedMeds] = useState<string[]>([])
  const [typedProblem, setTypedProblem] = useState('')

  const doctor = AIDoctorAgents.find(d => d.specialist === doctorSpecialist)

  // --- Auto-Scrolling Logic ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll to bottom whenever the messages array changes
  useEffect(scrollToBottom, [messages]) 
  // ----------------------------

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

    const userMsg: Message = {
      sessionId,
      sender: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])

    setIsTyping(true) // ✅ Show typing indicator

    try {
      const res = await fetch('/api/messages/ai-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      })

      if (!res.ok) {
        console.error('AI reply failed')
        // Add a generic error message if the API fails
        const errorMsg: Message = {
            sessionId, sender: 'ai', content: '❌ Error: Failed to get a response from the AI Doctor.',
            createdAt: new Date().toISOString(),
        }
        setMessages(prev => [...prev, errorMsg])
        return
      }

      const data = await res.json()
      // Ensure aiReply is not empty, use original fallback
      const aiReply = data.reply || '...' 

      const aiMsg: Message = {
        sessionId,
        sender: 'ai',
        content: aiReply,
        createdAt: new Date().toISOString(),
      }

      setMessages(prev => {
        const updated = [...prev, aiMsg]
        extractMedicines(updated)
        return updated
      })
    } catch (err) {
      console.error('Send message error:', err)
      // Add a network error message
      const errorMsg: Message = {
          sessionId, sender: 'ai', content: '❌ Network Error: Could not connect to the server.',
          createdAt: new Date().toISOString(),
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
      setIsTyping(false) // ✅ Hide typing indicator
    }
  }

  const handleEndChat = () => {
    setEnded(true)
    router.push(`/session/${sessionId}/result`)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Professional Header */}
      {doctor && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={doctor.image} 
                  alt={doctor.specialist} 
                  className="w-16 h-16 rounded-full border-4 border-blue-500 shadow-md object-cover" 
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{doctor.specialist}</h1>
                <p className="text-gray-600 text-sm mt-1">{doctor.description}</p>
              </div>
            </div>
            <button
              onClick={handleEndChat}
              disabled={ended}
              className="px-5 py-2 text-gray-700 font-semibold border-2 border-red-500 rounded-lg hover:bg-red-50 transition duration-200 text-sm"
            >
              End Consultation
            </button>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          <MessageList messages={messages} doctorSpecialist={doctorSpecialist} />

          {/* Animated Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 mt-6">
              <img 
                src={doctor?.image || '/doctor1.png'} 
                alt="Doctor" 
                className="w-9 h-9 rounded-full border-2 border-blue-300 flex-shrink-0"
              />
              <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3 border border-gray-200">
                <span className="text-gray-600 text-sm inline-flex items-center gap-1">
                  <span>🩺 AI Doctor is typing</span>
                  <span className="animate-bounce inline-block">.</span>
                  <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce inline-block" style={{ animationDelay: '0.4s' }}>.</span>
                </span>
              </div>
            </div>
          )}

          {/* Auto-scrolling anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Recommended Medicines */}
      {recommendedMeds.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-t-2 border-emerald-200 px-6 py-4 max-w-4xl mx-auto w-full">
          <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
            <span className="text-xl">💊</span>
            <span>Recommended Medicines</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendedMeds.map((med, idx) => (
              <span 
                key={idx} 
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition"
              >
                {med}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      {!ended && (
        <div className="bg-white border-t border-gray-200 px-6 py-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            {/* Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Describe Your Symptoms</label>
              <textarea
                className="w-full border-2 border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 resize-none"
                placeholder="Type your symptoms, concerns, or questions here..."
                value={typedProblem}
                onChange={(e) => setTypedProblem(e.target.value)}
                rows={3}
              />
            </div>

            {/* Button Group */}
            <div className="flex gap-3 md:flex-row flex-col">
              <button
                onClick={() => {
                  if (typedProblem.trim() !== '') {
                    handleSendMessage(typedProblem)
                    setTypedProblem('')
                  }
                }}
                disabled={!typedProblem.trim() || loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:shadow-inner flex items-center justify-center gap-2"
              >
                <span>📤</span>
                <span>Send Message</span>
              </button>

              <div className="flex-1">
                <VoiceRecorder onTranscription={handleSendMessage} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Ended State */}
      {ended && (
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-t border-gray-200 px-6 py-8 flex items-center justify-center min-h-24">
          <div className="text-center">
            <p className="text-gray-600 font-semibold mb-2">✅ Consultation Completed</p>
            <button
              onClick={() => router.push(`/session/${sessionId}/result`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              View Results & Summary
            </button>
          </div>
        </div>
      )}
    </div>
  )
}