"use client";

import { useState } from 'react';
import { AlertCircle, Activity, Heart, Clock, TrendingUp, Shield, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export function InjuryRisk() {
    const [workload, setWorkload] = useState(7);
    const [restDays, setRestDays] = useState(2);
    const [previousInjuries, setPreviousInjuries] = useState(1);

    // Calculate injury risk score (0-100)
    const calculateRiskScore = () => {
        const workloadScore = (workload / 10) * 40;
        const restScore = Math.max(0, (7 - restDays) / 7) * 30;
        const injuryHistoryScore = Math.min(previousInjuries * 10, 30);

        return Math.round(workloadScore + restScore + injuryHistoryScore);
    };

    const riskScore = calculateRiskScore();
    const getRiskLevel = () => {
        if (riskScore < 30) return { level: 'LOW', color: 'green', icon: CheckCircle, glow: 'shadow-green-400/50' };
        if (riskScore < 60) return { level: 'MODERATE', color: 'yellow', icon: AlertCircle, glow: 'shadow-yellow-400/50' };
        return { level: 'HIGH', color: 'red', icon: AlertTriangle, glow: 'shadow-red-400/50' };
    };

    const risk = getRiskLevel();
    const RiskIcon = risk.icon;

    const recommendations = [
        {
            condition: riskScore > 60,
            title: 'REDUCE_INTENSITY',
            description: 'Consider reducing high-intensity training sessions this week',
            icon: Activity,
            color: 'cyan',
        },
        {
            condition: restDays < 2,
            title: 'INCREASE_REST',
            description: 'Take at least 2 rest days per week for recovery',
            icon: Clock,
            color: 'magenta',
        },
        {
            condition: previousInjuries > 2,
            title: 'STRENGTHEN',
            description: 'Focus on injury prevention exercises and conditioning',
            icon: TrendingUp,
            color: 'yellow',
        },
        {
            condition: workload > 7,
            title: 'MONITOR_LOAD',
            description: 'Track your training load and avoid sudden increases',
            icon: Heart,
            color: 'orange',
        },
    ];

    const recoveryTips = [
        'SLEEP_7-9_HOURS_NIGHTLY',
        'HYDRATE_CONSTANTLY',
        'DYNAMIC_WARMUP_PROTOCOL',
        'COOLDOWN_STRETCHING',
        'PROTEIN_RICH_DIET',
        'LISTEN_TO_YOUR_BODY',
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-32 md:pb-8 pt-14 md:pt-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">

                {/* Navigation */}
                <div className="mb-12">
                    <Link href="/dashboard" className="flex items-center text-slate-400 hover:text-emerald-400 transition-colors font-bold tracking-widest text-xs">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        BACK_TO_DASHBOARD
                    </Link>
                </div>

                {/* Experimental Header */}
                <div className="mb-16 relative">
                    <div className="absolute -left-8 top-0 rotate-text hidden lg:block">
                        <span className="text-6xl text-white/5 tracking-[1em] font-black uppercase">
                            HEALTH
                        </span>
                    </div>

                    <div>
                        <div className="text-5xl md:text-8xl font-black text-white mb-2 leading-[0.8] tracking-tighter">
                            INJURY<br />
                            <span className="text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text">
                                ANALYSIS
                            </span>
                        </div>
                        <div className="text-emerald-400 text-xs font-mono tracking-[0.3em] mt-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full"></span>
                            SYSTEM_ACTIVE: RISK_ASSESSMENT_V2.0
                        </div>
                    </div>
                </div>

                {/* Risk Score Display - Circular Gauge */}
                <motion.div
                    className="mb-16 relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-slate-900/50 border-2 border-slate-800 p-8 md:p-16 rounded-[3rem] relative overflow-hidden backdrop-blur-3xl">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <div className="w-full h-full"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                                    backgroundSize: '30px 30px'
                                }}
                            />
                        </div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            {/* Circular Score */}
                            <div className="relative">
                                <svg className="w-64 h-64 md:w-80 md:h-80 transform -rotate-90">
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="45%"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth="12"
                                    />
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="45%"
                                        fill="none"
                                        stroke={risk.color === 'green' ? '#10b981' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444'}
                                        strokeWidth="12"
                                        strokeDasharray="283%"
                                        strokeDashoffset={`${283 * (1 - riskScore / 100)}%`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                        style={{
                                            filter: `drop-shadow(0 0 15px ${risk.color === 'green' ? '#10b981' : risk.color === 'yellow' ? '#f59e0b' : '#ef4444'}44)`,
                                        }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-7xl md:text-8xl font-black text-white mb-2 tracking-tighter tabular-nums">
                                        {riskScore}
                                    </div>
                                    <div className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase">
                                        Risk Factor Index
                                    </div>
                                </div>
                            </div>

                            {/* Risk Level Badge */}
                            <div className="flex-1 space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border-2 border-${risk.color}-500/30 bg-${risk.color}-500/10`}>
                                        <RiskIcon className={`w-10 h-10 text-${risk.color}-500`} />
                                    </div>
                                    <div>
                                        <div className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase mb-1">Status Report</div>
                                        <div className={`text-4xl md:text-5xl font-black text-${risk.color}-500 uppercase tracking-tighter`}>
                                            {risk.level}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium">
                                    Our AI models have processed your recent workload, rest cycles, and injury history. Your current profile suggests a <span className={`text-${risk.color}-500 font-bold`}>{risk.level.toLowerCase()}</span> risk of muscle strain or fatigue-related injury.
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-400">WORKLOAD: {workload}H</div>
                                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-400">REST: {restDays}D</div>
                                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-400">HISTORY: {previousInjuries}X</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Input Sliders */}
                <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { value: workload, setter: setWorkload, label: 'WEEKLY_LOAD', max: 20, unit: 'HRS', color: 'indigo' },
                        { value: restDays, setter: setRestDays, label: 'REST_DAYS', max: 7, unit: 'DAYS', color: 'pink' },
                        { value: previousInjuries, setter: setPreviousInjuries, label: 'INJURIES_6M', max: 5, unit: 'COUNT', color: 'amber' },
                    ].map((slider, index) => (
                        <motion.div
                            key={index}
                            className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] hover:border-slate-700 transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <div className="text-slate-500 text-[10px] font-black tracking-[0.2em] mb-6">
                                {slider.label}
                            </div>

                            <div className="text-4xl font-black text-white mb-8 tabular-nums">
                                {slider.value}
                                <span className="text-xs text-slate-500 ml-2 font-bold">{slider.unit}</span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max={slider.max}
                                value={slider.value}
                                onChange={(e) => slider.setter(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Recommendations */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <Shield className="w-8 h-8 text-emerald-500" />
                        <h3 className="text-3xl font-black text-white tracking-tighter">MITIGATION_STRATEGY</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendations
                            .filter((rec) => rec.condition)
                            .map((rec, index) => {
                                const Icon = rec.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex items-start gap-6 group hover:bg-slate-900 transition-all"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <div>
                                            <div className="text-white text-xl font-black mb-2 tracking-tight">
                                                {rec.title.replace(/_/g, ' ')}
                                            </div>
                                            <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                                {rec.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                    </div>

                    {recommendations.filter((rec) => rec.condition).length === 0 && (
                        <div className="text-center py-20 bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-[3rem]">
                            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-emerald-500/50" />
                            <div className="text-2xl font-black text-white mb-2">ALL SYSTEMS OPTIMAL</div>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">No immediate actions required</p>
                        </div>
                    )}
                </div>

                {/* Recovery Tips */}
                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 md:p-16">
                    <h3 className="text-3xl font-black text-white mb-12 tracking-tighter flex items-center gap-4">
                        <span className="w-2 h-10 bg-emerald-500 rounded-full"></span>
                        RECOVERY_PROTOCOL
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recoveryTips.map((tip, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center space-x-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 transition-all"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                            >
                                <CheckCircle className="w-5 h-5 text-emerald-500/50 flex-shrink-0" />
                                <span className="text-slate-300 text-xs font-black tracking-wider">{tip.replace(/_/g, ' ')}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
