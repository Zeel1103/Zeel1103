'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import DoctorBookingModal from '@/app/(routes)/dashboard/_components/DoctorBookingModal';
import { FileText, Download, User, Stethoscope, Pill, Leaf, Lightbulb, CalendarDays, ArrowLeft, Printer, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ResultData {
  problem: string;
  remedies: string[];
  advice: string;
  medicines?: string[];
  specialization: string;
  doctorName?: string;
}

export default function ResultPage() {
  const { id } = useParams();
  const router = useRouter();
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
      } catch (err) { console.error('Result error:', err); }
      finally { setLoading(false); }
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
    doc.setFontSize(16); doc.text('MedBot AI Clinic', 45, 12);
    doc.setFontSize(10); doc.text('Virtual Medical Consultation', 45, 18);
    doc.text('123 Health St, Wellness City | +91-9876543210 | medbot@clinic.com', 45, 24);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(60); doc.setTextColor(180, 180, 180);
    doc.text('MedBot AI', pageWidth / 2, pageHeight / 2, { angle: 45, align: 'center' });
    doc.setTextColor(0, 0, 0); doc.setFontSize(12); doc.rect(20, 40, 170, 35);
    doc.text(`Name: ${patientName || '[Name]'}`, 25, 50);
    doc.text(`Age: ${patientAge || '[Age]'}`, 120, 50);
    doc.text(`Gender: ${patientGender || '[Gender]'}`, 25, 60);
    doc.text(`Session ID: ${sessionId}`, 120, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 25, 70);
    let y = 85;
    doc.setFontSize(14); doc.setTextColor(200, 0, 0); doc.text('Patient Problem:', 20, y); y += 8;
    doc.setFontSize(12); doc.setTextColor(0); doc.text(doc.splitTextToSize(summary.problem, 170), 25, y); y += 20;
    if (summary.medicines && summary.medicines.length > 0) {
      doc.setFontSize(18); doc.setTextColor(0); doc.text('℞', 20, y + 5);
      doc.setFontSize(14); doc.setTextColor(128, 0, 128); doc.text('Prescribed Medicines:', 30, y); y += 8;
      doc.setFontSize(12); doc.setTextColor(0);
      summary.medicines.forEach((m, i) => { doc.text(`• ${m}`, 25, y + i * 8); });
      y += summary.medicines.length * 8 + 10;
    }
    if (summary.remedies && summary.remedies.length > 0) {
      doc.setFontSize(14); doc.setTextColor(0, 153, 51); doc.text('Suggested Remedies:', 20, y); y += 8;
      doc.setFontSize(12); doc.setTextColor(0);
      summary.remedies.forEach((r, i) => { doc.text(`• ${r}`, 25, y + i * 8); });
      y += summary.remedies.length * 8 + 10;
    }
    doc.setFontSize(14); doc.setTextColor(0, 102, 204); doc.text("AI Doctor's Final Advice:", 20, y); y += 8;
    doc.setFontSize(12); doc.setTextColor(0); doc.text(doc.splitTextToSize(summary.advice, 170), 25, y); y += 30;
    doc.text('_________________________', 120, y); doc.text(summary.doctorName || 'AI Doctor: MedBot MD', 125, y + 10);
    doc.setFontSize(9); doc.setTextColor(120);
    doc.text('Disclaimer: This prescription is AI-generated. Consult a certified doctor for serious conditions.', 20, 290);
    doc.save(`Prescription-${sessionId}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-900 font-semibold">Generating Report...</p>
          <p className="text-gray-400 text-sm mt-1">Analyzing your consultation</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md text-center">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <p className="text-gray-900 font-semibold text-lg">Unable to Generate Summary</p>
          <p className="text-gray-400 text-sm mt-1 mb-5">Please try the consultation again</p>
          <Link href="/dashboard"><button className="btn-primary text-sm px-6 py-2.5 rounded-xl">Back to Dashboard</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-500" />
              </button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Medical Report</h1>
              <p className="text-[11px] text-gray-400">Session #{sessionId} • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" title="Print">
              <Printer className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width vertical content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-5">

        {/* Patient Info + Download */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Patient Information</h2>
          </div>
          <div className="px-6 py-5">
            <div className="grid sm:grid-cols-4 gap-4 mb-5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input type="text" placeholder="Enter patient name" className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Age</label>
                <input type="number" placeholder="Years" className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Gender</label>
                <select className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" value={patientGender} onChange={(e) => setPatientGender(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <button onClick={downloadPrescription} className="btn-primary flex items-center justify-center gap-2 py-3 rounded-xl text-sm w-full sm:w-auto px-8">
              <Download className="w-4 h-4" />
              Download Prescription (PDF)
            </button>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <Stethoscope className="w-3.5 h-3.5 text-red-500" />
            </div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Diagnosis</h2>
          </div>
          <div className="px-6 py-5">
            <p className="text-gray-700 text-sm leading-relaxed">{summary.problem}</p>
          </div>
        </div>

        {/* Remedies + Medicines side by side */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Remedies */}
          {summary.remedies && summary.remedies.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Home Remedies</h2>
              </div>
              <div className="px-6 py-5 space-y-3">
                {summary.remedies.map((remedy, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 leading-relaxed">{remedy}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medicines */}
          {summary.medicines && summary.medicines.length > 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Pill className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Medicines</h2>
              </div>
              <div className="px-6 py-5 space-y-2">
                {summary.medicines.map((med, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-blue-500 font-bold text-base">℞</span>
                    <span className="text-sm text-gray-800 font-medium">{med}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // If no medicines, show the specialist card in this slot
            summary.specialization && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-emerald-500" />
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Book a Specialist</h2>
                </div>
                <div className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                    <Stethoscope className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">We recommend</p>
                  <p className="text-lg font-bold text-gray-900 mb-4">{summary.specialization}</p>
                  <DoctorBookingModal sessionId={sessionId} specialization={summary.specialization} />
                </div>
              </div>
            )
          )}
        </div>

        {/* Doctor's Advice */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5 text-violet-500" />
            </div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Doctor&apos;s Advice</h2>
          </div>
          <div className="px-6 py-5">
            <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{summary.advice}&rdquo;</p>
          </div>
        </div>

        {/* Book Specialist - if medicines exist, show it here */}
        {summary.medicines && summary.medicines.length > 0 && summary.specialization && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Recommended Specialist</h2>
            </div>
            <div className="px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Based on your diagnosis</p>
                  <p className="text-lg font-bold text-gray-900">{summary.specialization}</p>
                </div>
              </div>
              <DoctorBookingModal sessionId={sessionId} specialization={summary.specialization} />
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50/60 border border-amber-100 rounded-xl px-5 py-4">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-semibold">Medical Disclaimer:</span> This report is AI-generated for informational purposes only. Always consult a licensed healthcare provider for diagnosis and treatment.
          </p>
        </div>

        {/* Back */}
        <Link href="/dashboard" className="block">
          <button className="w-full py-3 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}