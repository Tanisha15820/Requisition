import React, { useRef } from 'react';
import { Calendar, X } from 'lucide-react';

// Helper to convert any date string (ISO, DD-MM-YYYY, DD/MM/YYYY, '14 Oct 2026') to YYYY-MM-DD
export const toISODate = (val) => {
    if (!val) return '';
    const str = String(val).trim();
    // Already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    // DD-MM-YYYY
    if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
        const [d, m, y] = str.split('-');
        return `${y}-${m}-${d}`;
    }
    // DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
        const [d, m, y] = str.split('/');
        return `${y}-${m}-${d}`;
    }
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return '';
};

export default function DatePickerInput({
    value = '',
    onChange,
    placeholder = 'YYYY-MM-DD',
    className = '',
}) {
    const inputRef = useRef(null);
    const isoValue = toISODate(value);

    const handleOpen = () => {
        if (inputRef.current) {
            if (typeof inputRef.current.showPicker === 'function') {
                try {
                    inputRef.current.showPicker();
                    return;
                } catch {
                    // fallback to focus
                }
            }
            inputRef.current.focus();
        }
    };

    const handleChange = (e) => {
        const raw = e.target.value;
        if (onChange) {
            // Formats consistently as YYYY-MM-DD
            onChange(raw);
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        if (onChange) {
            onChange('');
        }
    };

    return (
        <div
            onClick={handleOpen}
            className={`relative flex items-center justify-between h-full w-full cursor-pointer group select-none ${className}`}
            title="Click to select date"
        >
            {/* Display text */}
            <span
                className={`w-full px-1 text-[12px] font-normal truncate ${
                    isoValue ? 'text-black' : 'text-slate-400'
                }`}
            >
                {isoValue || placeholder}
            </span>

            {/* Icons on the right */}
            <div className="flex items-center gap-1 pr-1 flex-shrink-0">
                {isoValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="p-0.5 text-slate-300 hover:text-slate-600 rounded-full transition-colors z-20 cursor-pointer"
                        title="Clear date"
                    >
                        <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                )}
                <Calendar className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors pointer-events-none" />
            </div>

            {/* Invisible native date input spanning the container to ensure calendar popup opens on click across all browsers */}
            <input
                ref={inputRef}
                type="date"
                value={isoValue}
                onChange={handleChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                tabIndex={-1}
                aria-label="Date Picker"
            />
        </div>
    );
}
