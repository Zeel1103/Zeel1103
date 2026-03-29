'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import DoctorBookingModal from '@/app/(routes)/dashboard/_components/DoctorBookingModal';

interface ResultData {
  problem: string;
  remedies: string[];
  advice: string;
  medicines?: string[];
  specialization: string;
}

export default function ResultPage() {
  const { id } = useParams();
  const sessionId = id as string;

  const [summary, setSummary] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`/api/result-summary?sessionId=${sessionId}`);
        if (!res.ok) throw new Error('Failed to get result');
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error('Result error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId]);

  const downloadPrescription = () => {
    if (!summary) return;
    const doc = new jsPDF();
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 210, 30, 'F');
    doc.addImage('/med-logo.png', 'PNG', 10, 4, 30, 22);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('MedBot AI Clinic', 45, 12);
    doc.setFontSize(10);
    doc.text('Virtual Medical Consultation', 45, 18);
    doc.text('123 Health St, Wellness City | +91-9876543210 | medbot@clinic.com', 45, 24);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(60);
    doc.setTextColor(180, 180, 180);
    doc.text('MedBot AI', pageWidth / 2, pageHeight / 2, {
      angle: 45,
      align: 'center'
    });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.rect(20, 40, 170, 35);
    doc.text(`Name: ${patientName || '[Name]'}`, 25, 50);
    doc.text(`Age: ${patientAge || '[Age]'}`, 120, 50);
    doc.text(`Gender: ${patientGender || '[Gender]'}`, 25, 60);
    doc.text(`Session ID: ${sessionId}`, 120, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 25, 70);
    let y = 85;
    doc.setFontSize(14);
    doc.setTextColor(200, 0, 0);
    doc.text('Patient Problem:', 20, y);
    y += 8;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(doc.splitTextToSize(summary.problem, 170), 25, y);
    y += 20;
    if (summary.medicines && summary.medicines.length > 0) {
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text('℞', 20, y + 5);
      doc.setFontSize(14);
      doc.setTextColor(128, 0, 128);
      doc.text('Prescribed Medicines:', 30, y);
      y += 8;
      doc.setFontSize(12);
      doc.setTextColor(0);
      summary.medicines.forEach((m, i) => {
        doc.text(`• ${m}  [Dosage: ______ ]`, 25, y + i * 8);
      });
      y += summary.medicines.length * 8 + 10;
    }
    
    // ✅ FIX: Added a check to ensure remedies exist before trying to loop through them
    if (summary.remedies && summary.remedies.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(0, 153, 51);
      doc.text('Suggested Remedies:', 20, y);
      y += 8;
      doc.setFontSize(12);
      doc.setTextColor(0);
      summary.remedies.forEach((r, i) => {
        doc.text(`• ${r}`, 25, y + i * 8);
      });
      y += summary.remedies.length * 8 + 10;
    }

    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text("AI Doctor's Final Advice:", 20, y);
    y += 8;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(doc.splitTextToSize(summary.advice, 170), 25, y);
    y += 30;
    doc.setFontSize(12);
    doc.text('_________________________', 120, y);
    doc.text('AI Doctor: MedBot MD', 130, y + 10);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      'Disclaimer: This prescription is AI-generated. Consult a certified doctor for serious conditions.',
      20,
      290
    );
    doc.save(`Prescription-${sessionId}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <div className="animate-spin text-3xl">⏳</div>
          </div>
          <p className="text-gray-700 font-semibold text-lg">Generating Consultation Summary...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we compile your medical report</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <p className="text-red-600 font-semibold text-lg">Unable to Generate Summary</p>
          <p className="text-gray-500 text-sm mt-2">Please try the consultation again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Consultation Report</h1>
              <p className="text-gray-500 text-sm mt-1">Session ID: {sessionId}</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p className="font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Patient Information Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Patient Information
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Name Input */}
              <div className="md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter patient name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition duration-200"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              {/* Age Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  placeholder="Years"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition duration-200"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                />
              </div>

              {/* Gender Select */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition duration-200"
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadPrescription}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition duration-200 shadow-md hover:shadow-lg active:shadow-inner flex items-center justify-center gap-2"
            >
              <span className="text-xl">📥</span>
              <span>Download Prescription (PDF)</span>
            </button>
          </div>
        </div>

        {/* Consultation Summary Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-400 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🩺</span>
              Consultation Summary
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Problem */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
                <span>🏥</span>
                Patient's Problem
              </h3>
              <p className="text-gray-700 leading-relaxed">{summary.problem}</p>
            </div>

            {/* Remedies */}
            {summary.remedies && summary.remedies.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                  <span>🌿</span>
                  Suggested Home Remedies
                </h3>
                <ul className="space-y-2">
                  {summary.remedies.map((remedy, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span className="leading-relaxed">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Medicines */}
            {summary.medicines && summary.medicines.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                  <span>💊</span>
                  Recommended Medicines
                </h3>
                <div className="space-y-2">
                  {summary.medicines.map((med, idx) => (
                    <div key={idx} className="bg-white border border-blue-300 rounded p-3 flex items-center gap-2">
                      <span className="text-blue-600 font-bold">℞</span>
                      <span className="text-gray-800 font-semibold">{med}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advice */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
                <span>💡</span>
                AI Doctor's Final Advice
              </h3>
              <p className="text-gray-700 leading-relaxed italic">{summary.advice}</p>
            </div>
          </div>
        </div>

        {/* Book Appointment Section */}
        {summary && summary.specialization && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-400 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">📅</span>
                Recommended Specialist
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4 text-center">
                Based on your consultation, we recommend seeing a <span className="font-bold text-green-600">{summary.specialization}</span>
              </p>
              
              <div className="flex justify-center">
                <DoctorBookingModal
                  sessionId={sessionId}
                  specialization={summary.specialization}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-300 text-center py-6 mt-12 border-t border-gray-800">
        <p className="text-sm">
          ⚕️ <span className="font-semibold">Medical Disclaimer:</span> This report is AI-generated for informational purposes. Always consult a licensed healthcare provider for serious conditions.
        </p>
      </div>
    </div>
  );
}