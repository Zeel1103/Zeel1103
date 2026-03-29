'use client'

import React, { useState, useRef } from 'react'

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

  // 🎤 Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      setMicPermission('granted')
      setMicError(null)
      return stream
    } catch (err: any) {
      setMicError(null) // Clear previous error
      
      if (err.name === 'NotAllowedError') {
        // User denied permission
        setMicPermission('denied')
        setMicError(
          '❌ Microphone permission denied. Please enable it in your browser settings:\n\n' +
          '1. Click the lock icon in the address bar\n' +
          '2. Find "Microphone"\n' +
          '3. Change to "Allow"\n' +
          '4. Refresh the page and try again'
        )
        console.error('🔒 Microphone permission denied by user')
      } else if (err.name === 'NotFoundError') {
        // No microphone found
        setMicError('❌ No microphone found on this device. Please connect a microphone and try again.')
        console.error('🔌 No microphone device found')
      } else if (err.name === 'NotReadableError') {
        // Microphone in use
        setMicError('❌ Microphone is in use by another application. Please close other apps using the microphone and try again.')
        console.error('🔄 Microphone in use')
      } else if (err.name === 'SecurityError') {
        // HTTPS required or insecure context
        setMicError('❌ Microphone access only works on HTTPS or localhost. Current URL is not secure.')
        console.error('🔐 Security error - HTTPS required')
      } else {
        setMicError(`❌ Microphone error: ${err.message}`)
        console.error('🎤 Microphone error:', err)
      }
      
      return null
    }
  }

  const startRecording = async () => {
    try {
      // Stop previous stream if exists
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }

      // Request microphone permission
      const stream = await requestMicrophonePermission()
      
      if (!stream) {
        // Permission denied or error
        return
      }

      const mediaRecorder = new MediaRecorder(stream)
      audioChunks.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop())
        streamRef.current = null

        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' })
        console.log("🎤 Audio blob size:", audioBlob.size)

        if (audioBlob.size === 0) {
          console.error("❌ Empty audio blob, skipping transcription")
          setMicError('❌ No audio captured. Please try again.')
          onTranscription(null)
          setRecording(false)
          setProcessing(false)
          return
        }

        setProcessing(true)
        setMicError(null)

        try {
          const formData = new FormData()
          formData.append('file', audioBlob, 'recording.webm')

          const res = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          })

          if (!res.ok) {
            console.error('❌ Transcription failed:', await res.text())
            setMicError('❌ Transcription failed. Please try again.')
            onTranscription(null)
            return
          }

          const data = await res.json()
          console.log('✅ Transcription result:', data)
          onTranscription(data.text || null)
        } catch (err: any) {
          console.error('Transcription error:', err)
          setMicError(`❌ Transcription error: ${err.message}`)
          onTranscription(null)
        } finally {
          setProcessing(false)
        }
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setRecording(true)
      setMicError(null)
      console.log('🎙️ Recording started')
    } catch (err: any) {
      console.error('Recording error:', err)
      setMicError(`❌ Recording error: ${err.message}`)
      onTranscription(null)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
    console.log('⏹️ Recording stopped')
  }

  return (
    <div className="w-full space-y-3">
      {/* Error Message */}
      {micError && (
        <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg text-sm whitespace-pre-wrap">
          {micError}
        </div>
      )}

      {/* Permission Status Indicator */}
      {micPermission === 'granted' && !micError && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded-lg text-sm text-center">
          ✅ Microphone permission granted - Ready to record
        </div>
      )}

      {/* Connect Microphone Info */}
      <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-xs text-gray-700">
        <p className="font-semibold mb-1">💡 Microphone Info:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Make sure your microphone is connected</li>
          <li>Speak clearly and naturally after clicking "Start Speaking"</li>
          <li>Click "Stop Recording" when you're done</li>
          <li>Permission is requested when you first record</li>
        </ul>
      </div>

      {/* Record Button */}
      <button
        onClick={recording ? stopRecording : startRecording}
        disabled={processing}
        aria-busy={processing}
        className={`w-full px-5 py-3 rounded-lg text-white font-semibold transition duration-200 flex items-center justify-center gap-2 ${
          recording 
            ? 'bg-red-600 hover:bg-red-700 shadow-lg' 
            : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-md'
        } ${processing ? 'opacity-60 cursor-not-allowed' : 'active:shadow-inner'}`}
      >
        <span className="text-lg">
          {processing
            ? '⏳'
            : recording
            ? '⏹️'
            : '🎙️'}
        </span>
        <span>
          {processing
            ? 'Processing...'
            : recording
            ? 'Stop Recording'
            : 'Start Speaking'}
        </span>
      </button>

      {/* Recording Status */}
      {recording && (
        <div className="flex items-center justify-center gap-2 text-red-600 text-sm font-semibold">
          <span className="inline-block w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
          Recording... Speak now
        </div>
      )}
    </div>
  )
}

export default VoiceRecorder
