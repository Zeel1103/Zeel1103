import { SignUp } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-soft-gradient relative'>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-100/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-sky-100/40 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200/50">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900 leading-none">HealthAI</h1>
            <p className="text-xs text-gray-400">Medical Voice Agent</p>
          </div>
        </Link>

        <SignUp />
      </div>
    </div>
  )
}