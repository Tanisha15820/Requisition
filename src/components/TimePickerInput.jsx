import React, { useState, useRef, useEffect } from 'react';
import { Clock, X, Check } from 'lucide-react';

export const parseTime = (timeStr) => {
    if (!timeStr) {
        return { hour: '12', minute: '00', period: 'PM' };
    }
    const str = String(timeStr).trim();
    // 12-hour format e.g. "04:30 PM" or "4:30PM"
    const match12 = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/i);
    if (match12) {
        let h = parseInt(match12[1], 10);
        let m = match12[2];
        let p = match12[3] ? match12[3].toUpperCase() : 'AM';
        if (h === 0) h = 12;
        if (h > 12) {
            p = 'PM';
            h = h % 12 || 12;
        }
        return { hour: String(h).padStart(2, '0'), minute: m, period: p };
    }
    // 24-hour format e.g. "14:30"
    const match24 = str.match(/^(\d{1,2}):(\d{2})$/);
    if (match24) {
        let h = parseInt(match24[1], 10);
        let m = match24[2];
        let p = h >= 12 ? 'PM' : 'AM';
        let h12 = h % 12 || 12;
        return { hour: String(h12).padStart(2, '0'), minute: m, period: p };
    }
    return { hour: '12', minute: '00', period: 'PM' };
};

const HOURS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

export default function TimePickerInput({
    value = '',
    onChange,
    placeholder = 'HH:MM AM/PM',
    className = '',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const { hour, minute, period } = parseTime(value);

    // Close on click outside
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const updateTime = (newH, newM, newP) => {
        const formatted = `${newH}:${newM} ${newP}`;
        if (onChange) {
            onChange(formatted);
        }
    };

    const handleSelectHour = (h) => {
        updateTime(h, minute, period);
    };

    const handleSelectMinute = (m) => {
        updateTime(hour, m, period);
    };

    const handleSelectPeriod = (p) => {
        updateTime(hour, minute, p);
    };

    const handleSetNow = (e) => {
        e.stopPropagation();
        const now = new Date();
        let h = now.getHours();
        const m = String(now.getMinutes()).padStart(2, '0');
        const p = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        const hStr = String(h).padStart(2, '0');
        updateTime(hStr, m, p);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        if (onChange) {
            onChange('');
        }
    };

    return (
        <div ref={containerRef} className={`relative flex items-center h-full w-full select-none ${className}`}>
            {/* Cell Display / Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full h-full px-1 cursor-pointer group"
                title="Click to select time"
            >
                <span className={`text-[12px] font-normal truncate ${value ? 'text-black' : 'text-slate-400'}`}>
                    {value || placeholder}
                </span>

                <div className="flex items-center gap-1 flex-shrink-0">
                    {value && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-0.5 text-slate-300 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
                            title="Clear time"
                        >
                            <X className="w-3 h-3 stroke-[2.5]" />
                        </button>
                    )}
                    <Clock
                        className={`w-3.5 h-3.5 transition-colors pointer-events-none ${
                            isOpen ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'
                        }`}
                    />
                </div>
            </div>

            {/* Dropdown Popover */}
            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-xl p-3 w-[260px] text-xs font-sans text-slate-800 animate-in fade-in zoom-in-95 duration-150"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with Active Time Preview */}
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 mb-2.5">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Selected Time
                        </span>
                        <span className="font-bold text-[13px] text-blue-700 tracking-wider">
                            {hour}:{minute} {period}
                        </span>
                    </div>

                    {/* Columns Grid: Hours | Minutes | AM/PM */}
                    <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-100 text-center">
                        {/* Hours Column */}
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                Hour
                            </div>
                            <div className="h-36 overflow-y-auto space-y-1 pr-0.5 scrollbar-thin">
                                {HOURS.map((h) => {
                                    const isSel = hour === h;
                                    return (
                                        <button
                                            key={h}
                                            type="button"
                                            onClick={() => handleSelectHour(h)}
                                            className={`w-full py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                                                isSel
                                                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                                                    : 'text-slate-700 hover:bg-slate-100'
                                            }`}
                                        >
                                            {h}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Minutes Column */}
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                Min
                            </div>
                            <div className="h-36 overflow-y-auto space-y-1 pr-0.5 scrollbar-thin">
                                {MINUTES.map((m) => {
                                    const isSel = minute === m;
                                    return (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => handleSelectMinute(m)}
                                            className={`w-full py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                                                isSel
                                                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                                                    : 'text-slate-700 hover:bg-slate-100'
                                            }`}
                                        >
                                            {m}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* AM/PM Column */}
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                AM / PM
                            </div>
                            <div className="space-y-1.5 pt-1">
                                {['AM', 'PM'].map((p) => {
                                    const isSel = period === p;
                                    return (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => handleSelectPeriod(p)}
                                            className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                isSel
                                                    ? 'bg-blue-600 text-white shadow-xs'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between pt-2.5">
                        <button
                            type="button"
                            onClick={handleSetNow}
                            className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Set to Current Time"
                        >
                            Now
                        </button>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-black text-white text-[11px] font-semibold rounded-lg transition-all shadow-2xs cursor-pointer"
                            >
                                <Check className="w-3 h-3 stroke-[2.5]" />
                                <span>Done</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
