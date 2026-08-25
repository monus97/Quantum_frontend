import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  User,
  Download,
  CheckCircle2,
  Zap,
  RefreshCw,
  FileText,
  ArrowLeft,
  Feather,
} from "lucide-react";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://quantum-backend-y48d.onrender.com";
export default function App() {
  const [name, setName] = useState("Vikas Vitekari");
  const [dob, setDob] = useState("2001-07-25");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!dob) {
      setError("Please select your Date of Birth.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dob, name }),
      });

      const res = await response.json();
      if (!response.ok) {
        throw new Error(res.error || "Failed to process DOB");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!dob) return;
    setDownloading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dob, name }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Quantum_Sure_Success_Report_${(name || "Client").replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Background Decorative Glow Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-lg mx-auto space-y-8 my-auto">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a252c] border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest shadow-xl">
            <Sparkles className="w-3.5 h-3.5" /> Quantum & Vedic Frequency
            Science
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-gold-gradient tracking-wider drop-shadow-md">
            QUANTUM SURE SUCCESS
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto font-light leading-relaxed">
            Ancient Wisdom Meets Modern Quantum Physics
          </p>
        </div>

        {/* STATE 1: INPUT FORM */}
        {!isSubmitted ? (
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border-amber-500/30 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-cinzel text-amber-300">
                  Generate Report
                </h2>
                <p className="text-slate-400 text-xs">
                  Enter Date of Birth to calculate frequencies
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-5 h-5 text-amber-400/60" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#031418] border border-slate-700 focus:border-amber-500 rounded-xl text-slate-100 placeholder-slate-500 outline-none transition text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                  Date of Birth (DOB) <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-amber-400/60" />
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-[#031418] border border-slate-700 focus:border-amber-500 rounded-xl text-slate-100 outline-none transition text-sm font-medium"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 btn-gold rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 tracking-wider shadow-xl"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Processing
                    Factors...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" /> Submit & Process Scan
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* STATE 2: SUBMITTED STATE - CLEAN DOWNLOAD BUTTON ONLY */
          <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl border-emerald-500/40 text-center space-y-8 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-300">
                Your Report is Ready!
              </h2>
              <p className="text-slate-300 text-sm font-light">
                Scan factors computed for{" "}
                <strong className="text-white font-semibold">
                  {name || "Client"}
                </strong>
              </p>
              <div className="inline-block px-3 py-1 bg-[#031418] border border-amber-500/30 rounded-full text-xs text-amber-400 font-mono mt-1">
                DOB: {dob}
              </div>
            </div>

            {/* ONLY PDF DOWNLOAD BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="w-full py-5 px-6 btn-emerald rounded-2xl text-base sm:text-lg font-extrabold flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 tracking-wider shadow-2xl shadow-emerald-500/30 transition transform hover:scale-[1.02]"
              >
                {downloading ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" /> Generating
                    PDF Report...
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6" /> Download PDF Report (61
                    Pages)
                  </>
                )}
              </button>
            </div>

            {/* Reset / Change Details Button */}
            <div className="pt-4 border-t border-slate-700/50">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-300 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Change Date of Birth /
                Process Another Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
