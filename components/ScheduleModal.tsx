
import React, { useState } from 'react';
import { XMarkIcon, CalendarIcon } from './icons';
import { useI18n } from '../contexts/I18nContext';

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (date: string) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSchedule }) => {
    const { t } = useI18n();
    const [dateTime, setDateTime] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (dateTime) {
            onSchedule(dateTime);
            onClose();
        }
    };

    // Get current datetime for min attribute, format for datetime-local input (YYYY-MM-DDThh:mm)
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const minDate = now.toISOString().slice(0, 16);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-brand-medium rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-700 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label={t('cancel')}
                >
                    <XMarkIcon />
                </button>
                <h3 className="text-xl font-bold text-brand-light mb-4 flex items-center gap-2">
                    <CalendarIcon />
                    {t('scheduleReminder')}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t('pickDateTime')}
                        </label>
                        <input
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="w-full bg-brand-dark border border-gray-600 rounded-lg p-3 text-brand-light focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-colors"
                            required
                            min={minDate}
                        />
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-semibold text-sm"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={!dateTime}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-brand-orange to-brand-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm shadow-md"
                        >
                            {t('setReminder')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleModal;
