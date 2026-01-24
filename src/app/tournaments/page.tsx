"use client";

import { useState, useEffect } from 'react';
import { Trophy, MapPin, Calendar, Users, Search, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Tournament {
    _id: string;
    name: string;
    location: string;
    date: string;
    type: string;
    teams: number;
    fee: string;
    prize: string;
    status: 'upcoming' | 'registration' | 'completed';
    deadline: string;
}

export default function TournamentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'registration'>('all');
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/tournament')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch tournaments');
                return res.json();
            })
            .then(data => {
                setTournaments(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load tournaments');
                setLoading(false);
            });
    }, []);

    const filteredTournaments = tournaments.filter((tournament) => {
        const matchesSearch =
            tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tournament.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || tournament.status === filterType;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-32 md:pb-8 pt-14 md:pt-0 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <Link href="/dashboard" className="text-sm text-slate-500 hover:text-emerald-600 mb-2 inline-block">← Back to Dashboard</Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Tournament Discovery</h1>
                    <p className="text-gray-600">Find and register for football tournaments near you</p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tournaments by name or location..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'all'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterType('registration')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'registration'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Open
                            </button>
                            <button
                                onClick={() => setFilterType('upcoming')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'upcoming'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Upcoming
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {/* Tournament Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTournaments.map((tournament) => (
                        <div
                            key={tournament._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Trophy className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white/80 text-xs font-medium">{tournament.type} Tournament</div>
                                        <div className="text-white text-sm font-semibold">{tournament.teams} Teams</div>
                                    </div>
                                </div>
                                <div
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${tournament.status === 'registration'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-yellow-500 text-white'
                                        }`}
                                >
                                    {tournament.status === 'registration' ? 'Registration Open' : 'Upcoming'}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">{tournament.name}</h3>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">{tournament.location}</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">{tournament.date}</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">Registration Deadline: {tournament.deadline}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <div className="text-xs text-gray-600">Registration Fee</div>
                                        <div className="text-lg font-bold text-gray-900">{tournament.fee}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-600">Prize Money</div>
                                        <div className="text-lg font-bold text-green-600">{tournament.prize}</div>
                                    </div>
                                </div>

                                <button className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                    Register Team
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {!loading && filteredTournaments.length === 0 && (
                    <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tournaments found</h3>
                        <p className="text-gray-600">Try adjusting your search or filters</p>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Want to organize a tournament?</h3>
                    <p className="text-gray-700 mb-4">
                        Create and manage your own football tournaments with SMARTFOOT's tournament management tools.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Create Tournament
                    </button>
                </div>
            </div>
        </div>
    );
}
