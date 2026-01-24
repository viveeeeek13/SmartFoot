"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { PerformanceModal } from "@/components/dashboard/PerformanceModal";
import { InjuryRisk } from "@/components/dashboard/InjuryRisk";

import {
  Activity,
  Target,
  Clock,
  AlertTriangle,
  User as UserIcon,
  Save,
  Ruler,
  Dumbbell,
  Waves,
  Crosshair,
  Shield,
  Zap,
  Plus,
  ArrowLeft
} from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [showInjuryAnalysis, setShowInjuryAnalysis] = useState(false);
  const [form, setForm] = useState<any>({
    height: "",
    weight: "",
    stamina: 5,
    speed: 5,
    strength: 5,
    passing: 5,
    shooting: 5,
    defending: 5,
    preferredFoot: "Right",
  });
  const [statsData, setStatsData] = useState<any>(null);
  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(setStatsData);
  }, []);

  const [risk, setRisk] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/player")
        .then(res => res.json())
        .then(data => data && setForm((prev: any) => ({ ...prev, ...data })));

      fetch("/api/injury")
        .then(res => res.json())
        .then(setRisk);
    }
  }, [status]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-emerald-400">
          <Zap className="w-12 h-12 animate-pulse" />
          <span className="text-xl font-medium tracking-widest uppercase">Initializing...</span>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Performance <span className="text-emerald-400 font-black">HUB</span>
          </h1>
          <div className="flex items-center gap-3 text-slate-400">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <UserIcon className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-medium">{session.user?.name || session.user?.email}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowPerformanceModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            MATCH DATA
          </button>
          <button
            onClick={saveProfile}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:grayscale"
          >
            {isSaving ? <Activity className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? "SAVING..." : "SAVE PERFORMANCE DATA"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Physical Profile Section */}
        <section className="col-span-1 md:col-span-4 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-8">
            <Ruler className="text-emerald-400 w-6 h-6" />
            <h2 className="text-xl font-bold uppercase tracking-wider">Physical Build</h2>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="text-xs uppercase font-bold text-slate-500 mb-2 block group-focus-within:text-emerald-400 transition-colors">Height (cm)</label>
              <input
                name="height"
                type="number"
                placeholder="0"
                value={form.height}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-5 py-4 focus:border-emerald-500 focus:outline-none transition-all text-xl font-mono text-emerald-100"
              />
            </div>
            <div className="group">
              <label className="text-xs uppercase font-bold text-slate-500 mb-2 block group-focus-within:text-emerald-400 transition-colors">Weight (kg)</label>
              <input
                name="weight"
                type="number"
                placeholder="0"
                value={form.weight}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-5 py-4 focus:border-emerald-500 focus:outline-none transition-all text-xl font-mono text-emerald-100"
              />
            </div>
            <div className="group">
              <label className="text-xs uppercase font-bold text-slate-500 mb-2 block group-focus-within:text-emerald-400 transition-colors">Preferred Foot</label>
              <select
                name="preferredFoot"
                value={form.preferredFoot}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-5 py-4 focus:border-emerald-500 focus:outline-none transition-all text-lg font-bold text-emerald-100 appearance-none"
              >
                <option value="Right">Right Foot</option>
                <option value="Left">Left Foot</option>
                <option value="Both">Ambidextrous</option>
              </select>
            </div>
          </div>
        </section>

        {/* Technical Attributes Section */}
        <section className="col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Attributes Group 1: Athleticism */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-8">
              <Dumbbell className="text-emerald-400 w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wider">Athleticism</h2>
            </div>
            <div className="space-y-8">
              {[
                { name: 'stamina', icon: <Clock />, label: 'Engine / Stamina' },
                { name: 'speed', icon: <Zap />, label: 'Explosiveness' },
                { name: 'strength', icon: <Activity />, label: 'Physicality' },
              ].map(attr => (
                <div key={attr.name}>
                  <div className="flex justify-between mb-3 text-xs font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2">{attr.label}</span>
                    <span className="text-emerald-400">{form[attr.name]}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    name={attr.name}
                    value={form[attr.name]}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Attributes Group 2: Skills */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-8">
              <Crosshair className="text-emerald-400 w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wider">Technical Skills</h2>
            </div>
            <div className="space-y-8">
              {[
                { name: 'passing', icon: <Waves />, label: 'Vision / Passing' },
                { name: 'shooting', icon: <Target />, label: 'Accuracy / Power' },
                { name: 'defending', icon: <Shield />, label: 'Tactical Aware.' },
              ].map(attr => (
                <div key={attr.name}>
                  <div className="flex justify-between mb-3 text-xs font-black uppercase tracking-widest text-slate-400">
                    <span>{attr.label}</span>
                    <span className="text-emerald-400">{form[attr.name]}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    name={attr.name}
                    value={form[attr.name]}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Injury Risk Alert - Full Width within technical section grid */}
          <div className="sm:col-span-2 overflow-hidden relative group">
            {risk ? (
              <div className={`
                p-6 rounded-3xl border transition-all duration-500
                ${risk.riskLevel === 'HIGH' ? 'bg-red-500/10 border-red-500/50 text-red-100' :
                  risk.riskLevel === 'MEDIUM' ? 'bg-amber-500/10 border-amber-500/50 text-amber-100' :
                    'bg-emerald-500/10 border-emerald-500/50 text-emerald-100'}
              `}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div>
                      <span className="text-4xl font-black tabular-nums">{risk.riskScore}</span>
                      <span className="text-xs font-bold uppercase block opacity-60 mt-1">Risk Factor Index</span>
                    </div>
                    <button
                      onClick={() => setShowInjuryAnalysis(true)}
                      className="mt-2 text-[10px] font-black bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors border border-white/10 uppercase tracking-widest"
                    >
                      Full Analysis
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl animate-pulse flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="w-32 h-3 bg-slate-800 rounded"></div>
                  <div className="w-48 h-5 bg-slate-800 rounded"></div>
                </div>
              </div>
            )}
          </div>

        </section>

        {/* Performance Trends Section */}
        <section className="col-span-1 md:col-span-12 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-400 w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wider">Performance Trends</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span>GOALS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>ASSISTS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span>RATING</span>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <PerformanceChart />
          </div>
        </section>
      </div>

      {showPerformanceModal && (
        <PerformanceModal onClose={() => setShowPerformanceModal(false)} />
      )}

      {showInjuryAnalysis && (
        <div className="fixed inset-0 z-[120] bg-slate-950 overflow-y-auto pt-20">
          <button
            onClick={() => setShowInjuryAnalysis(false)}
            className="fixed top-8 left-8 z-[130] flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-black tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            EXIT_ANALYSIS
          </button>
          <InjuryRisk />
        </div>
      )}
    </div>
  );
}
