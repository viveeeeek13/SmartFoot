"use client";

import { Activity, Target, Users, Trophy, Shield, BarChart3, ArrowRight, Check, Zap, Cpu, Radio, MessageSquare, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleGetStarted = () => {
        if (status === "authenticated") {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    const features = [
        {
            icon: BarChart3,
            title: 'Performance Tracking',
            description: 'Real-time analytics and data visualization for your football career',
        },
        {
            icon: Shield,
            title: 'Injury Prevention',
            description: 'AI-powered risk assessment and recovery protocols',
        },
        {
            icon: Target,
            title: 'Position Analysis',
            description: 'Advanced algorithms to optimize your playing position',
        },
        {
            icon: Activity,
            title: 'Player Profile',
            description: 'Digital CV with comprehensive stats and video highlights',
        },
        {
            icon: Users,
            title: 'Team Formation',
            description: 'Tactical builder with 5v5 to 11v11 formation support',
        },
        {
            icon: Trophy,
            title: 'Tournament Hub',
            description: 'Discover and register for grassroots competitions',
        },
        {
            icon: MessageSquare,
            title: 'Huddle',
            description: 'Organize and join friendly matches with nearby teams',
            link: '/huddle'
        },
    ];

    const stats = [
        { value: '10K+', label: 'Active Players', icon: Users },
        { value: '500+', label: 'Tournaments', icon: Trophy },
        { value: '200+', label: 'Teams', icon: Activity },
        { value: '50+', label: 'Cities', icon: Radio },
    ];

    const benefits = [
        'Quantum-speed data processing',
        'Neural network position analysis',
        'Holographic performance visualization',
        'Blockchain-secured player records',
        'AI-powered scout matching',
        'Real-time tournament sync',
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl bg-emerald-500/30"
                />
                <div
                    className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl bg-blue-500/30"
                />
            </div>

            {/* Premium Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20">
                                <Zap className="w-6 h-6 text-slate-950" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">SMART<span className="text-emerald-400">FOOT</span></span>
                        </Link>

                        {/* Navigation Links - Desktop */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">SYSTEMS</a>
                            <Link href="/huddle" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">HUDDLE</Link>
                            <a href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">SCOUTING</a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4">
                            {status === "loading" ? (
                                <div className="w-20 h-8 bg-slate-900 animate-pulse rounded-lg" />
                            ) : status === "authenticated" ? (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/dashboard"
                                        className="hidden sm:flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>DASHBOARD</span>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-all"
                                        title="Sign Out"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span className="hidden sm:inline">LOGIN</span>
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        <span>SIGN UP</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Badge */}
                            <motion.div
                                className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Cpu className="w-4 h-4 mr-2" />
                                <span>NEXT-GEN FOOTBALL PLATFORM</span>
                            </motion.div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                ELEVATE YOUR
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                                    FOOTBALL CAREER
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl mb-8 leading-relaxed text-slate-400">
                                SMARTFOOT is your complete cybernetic platform for performance tracking,
                                injury management, and player discovery in grassroots football.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <button
                                    onClick={handleGetStarted}
                                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20"
                                >
                                    <span>{status === "authenticated" ? "GO TO DASHBOARD" : "INITIALIZE SYSTEM"}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                {status === "unauthenticated" && (
                                    <Link
                                        href="/register"
                                        className="border border-slate-700 hover:border-slate-500 bg-slate-900/50 px-8 py-4 rounded-xl font-bold transition-all text-center"
                                    >
                                        REGISTER NOW
                                    </Link>
                                )}
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            className="text-center bg-slate-900/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                                        >
                                            <Icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                                            <div className="text-2xl font-bold mb-1 text-white">{stat.value}</div>
                                            <div className="text-[10px] text-slate-500 font-bold tracking-tighter uppercase">{stat.label}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Right Visual */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
                                {/* Main Display */}
                                <div className="aspect-square mb-6 relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-950 flex items-center justify-center">
                                    <Zap
                                        className="w-32 h-32 text-emerald-400"
                                        style={{ filter: 'drop-shadow(0 0 20px rgba(52, 211, 153, 0.4))' }}
                                    />

                                    {/* Animated Rings */}
                                    <motion.div
                                        className="absolute inset-0 border-2 rounded-full border-emerald-500/20"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-8 border-2 rounded-full border-blue-500/20"
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    />
                                </div>

                                {/* Mini Stats Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {['GOALS: 12', 'ASSISTS: 8', 'MATCHES: 24', 'RATING: 8.2'].map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-slate-950/50 border border-slate-800 p-3 text-center rounded-xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 + index * 0.1 }}
                                        >
                                            <p className="text-xs font-bold text-emerald-400 tracking-wider">{stat}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    className="absolute -top-4 -right-4 px-4 py-2 bg-blue-500 text-white text-xs font-black rounded-lg shadow-xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                >
                                    PLAYER ACCESS
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 relative bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">CORE SYSTEMS</h2>
                            <div className="h-1.5 w-24 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Advanced modules engineered for grassroots football excellence
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition-all group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                                        <Icon className="w-7 h-7 text-slate-950" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed mb-4">{feature.description}</p>
                                    {feature.link && (
                                        <Link
                                            href={feature.link}
                                            className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1 group/link"
                                        >
                                            OPEN HUB <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">WHY SMARTFOOT?</h2>
                            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                                Join the network of elite grassroots players leveraging cutting-edge
                                technology for career advancement.
                            </p>

                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center space-x-4 bg-slate-900/50 border border-slate-800 p-4 rounded-2xl"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-slate-950" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-200 tracking-wide">{benefit}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="">
                            <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
                                <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">READY TO INITIALIZE?</h3>
                                <p className="text-slate-400 mb-10 leading-relaxed text-lg">
                                    {status === "authenticated"
                                        ? "Welcome back! Access your personalized performance stats and training insights now."
                                        : "Create your digital player profile and begin tracking your football journey through the quantum realm."}
                                </p>
                                <button
                                    onClick={handleGetStarted}
                                    className="w-full bg-white text-slate-950 py-5 rounded-2xl text-lg font-black hover:bg-emerald-400 transition-all shadow-xl shadow-white/5 active:scale-95"
                                >
                                    {status === "authenticated" ? "GO TO HUB" : "CREATE PROFILE"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm font-medium tracking-widest">
                    © 2024 SMARTFOOT // CLASSIFIED PERFORMANCE DATA
                </div>
            </footer>
        </div>
    );
}
