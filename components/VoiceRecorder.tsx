'use client'

import React, { useState, useRef } from 'react'
import { Mic, Square, Loader2 } from 'lucide-react'

type VoiceRecorderProps = {
  onTranscription: (text: string | null) => void
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscription }) => {
  const [recording, setRecording] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt')
  const [micError, setMicError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      setMicPermission('granted')
      setMicError(null)
      return stream
    } catch (err: any) {
      setMicError(null)
      if (err.name === 'NotAllowedError') { setMicPermission('denied'); setMicError('Mic permission denied. Enable it in browser settings.'); }
      else if (err.name === 'NotFoundError') { setMicError('No microphone found. Connect one and try again.'); }
      else if (err.name === 'NotReadableError') { setMicError('Microphone in use by another app.'); }
      else { setMicError(`Mic error: ${err.message}`); }
      return null
    }
  }

  const startRecording = async () => {
    try {
      if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); }
      const stream = await requestMicrophonePermission()
      if (!stream) return
      const mediaRecorder = new MediaRecorder(stream)
      audioChunks.current = []
      mediaRecorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunks.current.push(event.data); }
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop())
        streamRef.current = null
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' })
        if (audioBlob.size === 0) { setMicError('No audio captured.'); onTranscription(null); setRecording(false); setProcessing(false); return; }
        setProcessing(true); setMicError(null)
        try {
          const formData = new FormData()
          formData.append('file', audioBlob, 'recording.webm')
          const res = await fetch('/api/transcribe', { method: 'POST', body: formData })
          if (!res.ok) { setMicError('Transcription failed.'); onTranscription(null); return; }
          const data = await res.json()
          onTranscription(data.text || null)
        } catch (err: any) { setMicError(`Error: ${err.message}`); onTranscription(null); }
        finally { setProcessing(false); }
      }
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setRecording(true)
      setMicError(null)
    } catch (err: any) { setMicError(`Recording error: ${err.message}`); onTranscription(null); }
  }

  const stopRecording = () => { mediaRecorderRef.current?.stop(); setRecording(false); }

  return (
    <div className="w-full space-y-2">
      {micError && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-xl text-xs font-medium">
          {micError}
        </div>
      )}

      <button
        onClick={recording ? stopRecording : startRecording}
        disabled={processing}
        className={`w-full px-5 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
          recording 
            ? 'bg-red-50 border-2 border-red-200 text-red-600 hover:bg-red-100' 
            : 'bg-emerald-50 border-2 border-emerald-100 text-emerald-700 hover:bg-emerald-100'
        } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {processing ? (
          <><Loader2 className="w-4 h-4 animate-spin" /><span>Processing...</span></>
        ) : recording ? (
          <><Square className="w-4 h-4" /><span>Stop Recording</span></>
        ) : (
          <><Mic className="w-4 h-4" /><span>🎙️ Voice Input</span></>
        )}
      </button>

      {recording && (
        <div className="flex items-center justify-center gap-2 text-red-500 text-xs font-semibold">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          Recording... Speak now
        </div>
      )}
    </div>
  )
}

export default VoiceRecorder
