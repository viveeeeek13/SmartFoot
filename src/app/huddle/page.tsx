"use client";

import { useState } from 'react';
import { MessageSquare, MapPin, Calendar, Users, Clock, Plus, Filter, ArrowLeft, Check, Lock } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HuddlePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filterType, setFilterType] = useState<'all' | 'nearby' | 'today'>('all');
    const [joinedHuddles, setJoinedHuddles] = useState<number[]>([]);
    const [huddlesList, setHuddlesList] = useState([
        {
            id: 1,
            creator: 'Vikram Sharma',
            team: 'Mumbai Warriors',
            location: 'Azad Maidan, Mumbai',
            date: '2026-01-20',
            time: '6:00 PM',
            format: '7v7',
            playersNeeded: 7,
            distance: '2.3 km',
            status: 'open',
        },
        {
            id: 2,
            creator: 'Rahul Verma',
            team: 'Delhi Strikers',
            location: 'Jawaharlal Nehru Stadium, Delhi',
            date: '2026-01-18',
            time: '5:30 PM',
            format: '5v5',
            playersNeeded: 5,
            distance: '1.8 km',
            status: 'open',
        },
        {
            id: 3,
            creator: 'Amit Patel',
            team: 'Bangalore United',
            location: 'Kanteerava Stadium, Bangalore',
            date: '2026-01-22',
            time: '7:00 PM',
            format: '11v11',
            playersNeeded: 11,
            distance: '5.1 km',
            status: 'open',
        },
        {
            id: 4,
            creator: 'Suresh Kumar',
            team: 'Pune FC',
            location: 'Shree Shiv Chhatrapati Sports Complex',
            date: '2026-01-18',
            time: '4:00 PM',
            format: '7v7',
            playersNeeded: 7,
            distance: '3.5 km',
            status: 'open',
        },
    ]);

    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'info' } | null>(null);

    const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const toggleJoinHuddle = (id: number) => {
        if (status !== "authenticated") {
            showNotification("Please login to join the match!", "info");
            setTimeout(() => router.push("/login?callbackUrl=/huddle"), 1000);
            return;
        }

        if (joinedHuddles.includes(id)) {
            setJoinedHuddles(joinedHuddles.filter(hId => hId !== id));
            showNotification("Left the match", "info");
        } else {
            setJoinedHuddles([...joinedHuddles, id]);
            showNotification("Successfully joined the match!");
        }
    };

    const handleCreateButtonClick = () => {
        if (status !== "authenticated") {
            showNotification("Please login to create a huddle!", "info");
            setTimeout(() => router.push("/login?callbackUrl=/huddle"), 1000);
            return;
        }
        setShowCreateModal(true);
    };

    const handleCreateHuddle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newHuddle = {
            id: Date.now(),
            creator: 'You',
            team: 'Your Team',
            location: formData.get('location') as string,
            date: formData.get('date') as string,
            time: formData.get('time') as string,
            format: formData.get('format') as string,
            playersNeeded: parseInt(formData.get('playersNeeded') as string),
            distance: '0.0 km',
            status: 'open',
        };
        setHuddlesList([newHuddle, ...huddlesList]);
        setShowCreateModal(false);
        showNotification("Huddle created successfully!");
    };

    const filteredHuddles = huddlesList.filter((huddle) => {
        if (filterType === 'nearby') return parseFloat(huddle.distance) < 3;
        if (filterType === 'today') return huddle.date === '2026-01-18';
        return true;
    });

    return (
        <div className="min-h-screen pb-32 md:pb-8 pt-14 md:pt-0 bg-gray-50">
            {/* Toast Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-right-full ${notification.type === 'success'
                    ? 'bg-emerald-500/90 border-emerald-400 text-white'
                    : 'bg-blue-500/90 border-blue-400 text-white'
                    }`}>
                    <div className="flex items-center gap-2 font-bold">
                        <Check className="w-5 h-5" />
                        {notification.message}
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {/* Navigation */}
                <div className="mb-6">
                    <Link href="/" className="flex items-center text-gray-600 hover:text-green-600 transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span>Back to Home</span>
                    </Link>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Huddle Hub</h1>
                        <p className="text-gray-600 font-medium">Find and organize friendly matches with nearby teams</p>
                    </div>
                    <button
                        onClick={handleCreateButtonClick}
                        className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-95 font-bold"
                    >
                        <Plus className="w-6 h-6" />
                        <span>Create New Huddle</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-center space-x-3 overflow-x-auto pb-2 md:pb-0">
                        <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        {(['all', 'nearby', 'today'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${filterType === type
                                    ? 'bg-green-600 text-white shadow-md shadow-green-600/10'
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)} Matches
                            </button>
                        ))}
                    </div>
                </div>

                {/* Huddle Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredHuddles.map((huddle) => (
                        <div
                            key={huddle.id}
                            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`px-8 py-6 transition-colors ${joinedHuddles.includes(huddle.id) ? 'bg-emerald-500' : 'bg-gradient-to-br from-indigo-600 to-violet-700'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">Organized by</div>
                                        <div className="text-white text-xl font-black">{huddle.creator}</div>
                                        <div className="text-white/90 text-sm font-medium">{huddle.team}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-black border border-white/20">
                                            {huddle.format}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Location</div>
                                            <div className="text-sm text-gray-900 font-bold leading-tight">{huddle.location}</div>
                                            <div className="text-[10px] text-green-600 font-black mt-1 uppercase">{huddle.distance} away</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Date & Time</div>
                                            <div className="text-sm text-gray-900 font-bold">{huddle.date}</div>
                                            <div className="text-xs text-gray-500 font-medium">{huddle.time}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 col-span-full">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Users className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Availability</div>
                                            <div className="text-sm text-gray-900 font-bold">
                                                Looking for <span className="text-indigo-600">{huddle.playersNeeded}</span> more players
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => toggleJoinHuddle(huddle.id)}
                                        className={`flex-1 py-4 rounded-2xl font-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${joinedHuddles.includes(huddle.id)
                                            ? 'bg-gray-900 text-white shadow-gray-200'
                                            : 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-400'
                                            }`}
                                    >
                                        {status !== "authenticated" && <Lock className="w-4 h-4 opacity-50" />}
                                        {joinedHuddles.includes(huddle.id) ? 'LEAVE MATCH' : 'JOIN MATCH'}
                                    </button>
                                    <button
                                        onClick={() => showNotification("Chat feature coming soon!", "info")}
                                        className="w-16 bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center border border-gray-200 active:scale-90"
                                    >
                                        <MessageSquare className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredHuddles.length === 0 && (
                    <div className="bg-white rounded-[2rem] p-20 shadow-sm border border-gray-100 text-center mt-8">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Ghost Town...</h3>
                        <p className="text-gray-500 font-medium">No huddles found. Be the first to start a match in this area!</p>
                    </div>
                )}

                {/* How it Works */}
                <div className="mt-16 bg-indigo-50/50 rounded-[2.5rem] p-10 border border-indigo-100">
                    <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                        How Huddle Works
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { step: 1, title: 'Squad Up', desc: 'Create a huddle for your team or hunt for an open slot.' },
                            { step: 2, title: 'Sync Details', desc: 'Chat with the organizers to confirm colors and gear.' },
                            { step: 3, title: 'Dominate', desc: 'Show up at the ground and let the feet do the talking.' }
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col">
                                <div className="text-4xl font-black text-indigo-200 mb-4">0{item.step}</div>
                                <div className="font-black text-gray-900 text-xl mb-2">{item.title}</div>
                                <div className="text-gray-600 font-medium leading-relaxed">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Create Huddle Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="sticky top-0 bg-white/80 backdrop-blur-md px-10 py-8 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">New Huddle</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateHuddle} className="p-10">
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Format</label>
                                        <select name="format" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold appearance-none">
                                            <option>5v5</option>
                                            <option>7v7</option>
                                            <option>11v11</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Players Needed</label>
                                        <input
                                            name="playersNeeded"
                                            type="number"
                                            min="1"
                                            defaultValue="7"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Location</label>
                                    <input
                                        name="location"
                                        type="text"
                                        required
                                        placeholder="e.g. Decathlon Turf, Andheri"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Date</label>
                                        <input
                                            name="date"
                                            type="date"
                                            required
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Time</label>
                                        <input
                                            name="time"
                                            type="time"
                                            required
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Notes</label>
                                    <textarea
                                        name="notes"
                                        rows={3}
                                        placeholder="Bring black kit, strictly no studs..."
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold placeholder:text-gray-300 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col gap-4">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-5 rounded-2xl text-lg font-black hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 active:scale-95"
                                >
                                    Post Huddle
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                                >
                                    Discard Draft
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
