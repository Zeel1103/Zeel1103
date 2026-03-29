"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function MedicalVoiceAgent() {
  const router = useRouter()
  const sessionId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : null

  useEffect(() => {
    // Redirect to the correct session page
    if (sessionId) {
      router.push(`/session/${sessionId}`)
    }
  }, [sessionId, router])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
        <p className='text-gray-600 dark:text-gray-400'>Loading consultation...</p>
      </div>
    </div>
  )
}

export default MedicalVoiceAgent