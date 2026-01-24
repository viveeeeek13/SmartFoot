"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PerformanceModalProps {
  onClose: () => void;
}

export function PerformanceModal({ onClose }: PerformanceModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    opponent: '',
    result: 'W',
    score: '',
    goals: '',
    assists: '',
    tackles: '',
    passes: '',
    minutesPlayed: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    alert('Match data added successfully!');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
          style={{ backgroundColor: 'var(--surface)' }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Header */}
          <div className="sticky top-0 px-6 py-4 border-b z-10" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                Add Match Data
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors hover-lift"
                style={{ color: 'var(--secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Match Date <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input"
                  required
                  aria-label="Match date"
                />
              </div>

              {/* Opponent */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Opponent <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.opponent}
                  onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                  placeholder="Enter opponent name"
                  className="input"
                  required
                  aria-label="Opponent name"
                />
              </div>

              {/* Result */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Result <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  className="input"
                  required
                  aria-label="Match result"
                >
                  <option value="W">Win</option>
                  <option value="D">Draw</option>
                  <option value="L">Loss</option>
                </select>
              </div>

              {/* Score */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Score <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  placeholder="3-1"
                  className="input"
                  required
                  aria-label="Match score"
                />
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Goals <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="input"
                  required
                  aria-label="Goals scored"
                />
              </div>

              {/* Assists */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Assists <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.assists}
                  onChange={(e) => setFormData({ ...formData, assists: e.target.value })}
                  className="input"
                  required
                  aria-label="Assists"
                />
              </div>

              {/* Tackles */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Tackles <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.tackles}
                  onChange={(e) => setFormData({ ...formData, tackles: e.target.value })}
                  className="input"
                  required
                  aria-label="Tackles made"
                />
              </div>

              {/* Passes */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Passes <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.passes}
                  onChange={(e) => setFormData({ ...formData, passes: e.target.value })}
                  className="input"
                  required
                  aria-label="Passes completed"
                />
              </div>

              {/* Minutes Played */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Minutes Played <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={formData.minutesPlayed}
                  onChange={(e) => setFormData({ ...formData, minutesPlayed: e.target.value })}
                  className="input"
                  required
                  aria-label="Minutes played"
                />
                {formData.minutesPlayed && (
                  <div className="mt-2">
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: 'var(--primary)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(Number(formData.minutesPlayed) / 120) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--secondary)' }}>
                      {formData.minutesPlayed} of 120 minutes
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={isSubmitting}
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary hover-lift"
                disabled={isSubmitting}
                aria-label="Add match data"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    />
                    <span>Adding...</span>
                  </span>
                ) : (
                  'Add Match'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
