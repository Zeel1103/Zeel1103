'use client'

import { useLanguage } from '@/context/LanguageContext'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="mb-4">
      <label className="mr-2 text-sm font-medium">Language:</label>
      <select
        className="border px-2 py-1 rounded-md"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
