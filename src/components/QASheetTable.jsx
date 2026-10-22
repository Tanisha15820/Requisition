import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import DatePickerInput from './DatePickerInput';
import TimePickerInput from './TimePickerInput';

export default function QASheetTable({
    sheetType = 'Sheet 1',
    unit = 'Bawal',
    formData = {},
    rows = [],
    onFormChange,
    onRowChange,
    onAddRow,
    onDeleteRow,
    searchQuery = '',
    hasCompanyHeader = false,
}) {
    // S.No. table displays active rows, defaulting to 5 blank rows if empty
    const displayRows = React.useMemo(() => {
        if (Array.isArray(rows) && rows.length > 0) {
            const isAllBlank = rows.every((r) => {
                const { sNo, ...rest } = r;
                return Object.values(rest).every((v) => !v || String(v).trim() === '');
            });
            // If rows were initialized with legacy 18 blank rows, clamp to default 5
            if (rows.length === 18 && isAllBlank) {
                return rows.slice(0, 5).map((r, idx) => ({ ...r, sNo: `${idx + 1}` }));
            }
            return rows;
        }
        return Array.from({ length: 5 }, (_, idx) => ({
            sNo: `${idx + 1}`,
            characteristics: '',
            specified: '',
            actual: '',
            status: '',
            remarks: '',
        }));
    }, [rows]);

    const handleAdd = (idx) => {
        if (onAddRow) {
            onAddRow(idx);
        }
    };

    const handleDelete = (idx) => {
        if (onDeleteRow) {
            onDeleteRow(idx);
        }
    };

    const isRowMatch = (row) => {
        if (!searchQuery) return false;
        const q = searchQuery.toLowerCase();
        return (
            (row.sNo && row.sNo.toLowerCase().includes(q)) ||
            (row.characteristics && row.characteristics.toLowerCase().includes(q)) ||
            (row.specified && row.specified.toLowerCase().includes(q)) ||
            (row.actual && row.actual.toLowerCase().includes(q)) ||
            (row.status && row.status.toLowerCase().includes(q)) ||
            (row.remarks && row.remarks.toLowerCase().includes(q))
        );
    };

    return (
        <table
            className="w-full border-collapse border-0 table-fixed text-[13px] leading-tight select-text"
            style={{
                borderCollapse: 'collapse',
                fontFamily: "Arial, 'Segoe UI', Helvetica, sans-serif",
            }}
        >
            {/* 10 Columns:
                Col 1: Actions (~5.5%)
                Col 2: S. No. (~6.5%)
                Col 3: Characteristics 1 (~11%)
                Col 4: Characteristics 2 (~14%)
                Col 5: Specified 1 (~9%)
                Col 6: Specified 2 (~9%)
                Col 7: Actual 1 (~9%)
                Col 8: Actual 2 (~9%)
                Col 9: Status (~13%)
                Col 10: Remarks (~14%)
            */}
            <colgroup>
                <col style={{ width: '5.5%' }} />
                <col style={{ width: '6.5%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '14%' }} />
            </colgroup>

            <tbody>
                {/* TOP HEADER ROW: FURUKAWA MINDA ELECTRIC PVT. LTD. */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={10}
                        className="border-b border-black px-3 py-1 text-right align-middle font-bold text-[13px] sm:text-[14px] uppercase tracking-wide text-black bg-white"
                    >
                        FURUKAWA MINDA ELECTRIC PVT. LTD.
                    </td>
                </tr>

                {/* ROW 1 & 2: Header Title + Date / Time Box */}
                <tr style={{ height: '24px' }}>
                    {/* Main Slip Title - spans 8 columns and 2 rows */}
                    <td
                        colSpan={8}
                        rowSpan={2}
                        className="border-b border-r border-black p-1 text-center align-middle font-bold text-[17px] sm:text-[19px] tracking-wide text-black bg-white"
                    >
                        Q.A. LAB REQUISITION SLIP
                    </td>
                    {/* Date Field */}
                    <td
                        colSpan={2}
                        className="border-b border-black p-0 align-middle text-[12px]"
                        style={{ height: '22px' }}
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none pr-1">
                                Date:
                            </span>
                            <DatePickerInput
                                value={formData.date || ''}
                                onChange={(val) => onFormChange('date', val)}
                            />
                        </div>
                    </td>
                </tr>
                <tr style={{ height: '24px' }}>
                    {/* Time Field */}
                    <td
                        colSpan={2}
                        className="border-b border-black p-0 align-middle text-[12px]"
                        style={{ height: '22px' }}
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none pr-1">
                                Time:
                            </span>
                            <TimePickerInput
                                value={formData.time || ''}
                                onChange={(val) => onFormChange('time', val)}
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 3: Project Name & Submission Frequency */}
                <tr style={{ height: '28px' }}>
                    <td
                        colSpan={5}
                        className="border-b border-r border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Project Name :
                            </span>
                            <input
                                type="text"
                                value={formData.projectName || ''}
                                onChange={(e) => onFormChange('projectName', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                    <td
                        colSpan={5}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Submission Frequency :
                            </span>
                            <input
                                type="text"
                                value={formData.submissionFrequency || ''}
                                onChange={(e) => onFormChange('submissionFrequency', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 4: Part Name & Part No. */}
                <tr style={{ height: '28px' }}>
                    <td
                        colSpan={5}
                        className="border-b border-r border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Part Name :
                            </span>
                            <input
                                type="text"
                                value={formData.partName || ''}
                                onChange={(e) => onFormChange('partName', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                    <td
                        colSpan={5}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Part No. :
                            </span>
                            <input
                                type="text"
                                value={formData.partNo || ''}
                                onChange={(e) => onFormChange('partNo', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 5: Product Type */}
                <tr style={{ height: '28px' }}>
                    <td
                        colSpan={10}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Product Type :
                            </span>
                            <input
                                type="text"
                                value={formData.productType || ''}
                                onChange={(e) => onFormChange('productType', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 6: Lot No & Nos. of Sample */}
                <tr style={{ height: '28px' }}>
                    <td
                        colSpan={5}
                        className="border-b border-r border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Lot No :
                            </span>
                            <input
                                type="text"
                                value={formData.lotNo || ''}
                                onChange={(e) => onFormChange('lotNo', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                    <td
                        colSpan={5}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Nos. of Sample :
                            </span>
                            <input
                                type="text"
                                value={formData.nosOfSample || ''}
                                onChange={(e) => onFormChange('nosOfSample', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 7: Requested Name & Received By */}
                <tr style={{ height: '28px' }}>
                    <td
                        colSpan={5}
                        className="border-b border-r border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Requested Name :
                            </span>
                            <input
                                type="text"
                                value={formData.requestedName || ''}
                                onChange={(e) => onFormChange('requestedName', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                    <td
                        colSpan={5}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Received By :
                            </span>
                            <input
                                type="text"
                                value={formData.receivedBy || ''}
                                onChange={(e) => onFormChange('receivedBy', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 8: Purpose:- */}
                <tr style={{ height: '28px' }}>
                    <td
                        colSpan={10}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Purpose:-
                            </span>
                            <input
                                type="text"
                                value={formData.purpose || ''}
                                onChange={(e) => onFormChange('purpose', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 9: Table Header Row */}
                <tr style={{ height: '30px' }} className="font-normal text-[12px] text-center bg-slate-50/60">
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        Actions
                    </td>
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        S. No.
                    </td>
                    <td colSpan={2} className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        Characteristics
                    </td>
                    <td colSpan={2} className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        Specified
                    </td>
                    <td colSpan={2} className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        Actual
                    </td>
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        Status
                    </td>
                    <td className="border-b border-black p-1 text-center align-middle font-normal select-none">
                        Remarks
                    </td>
                </tr>

                {/* S.No. Data Rows */}
                {displayRows.map((row, idx) => {
                    const matched = isRowMatch(row);
                    return (
                        <tr
                            key={idx}
                            className={matched ? 'bg-amber-100/70 transition-colors' : 'hover:bg-blue-50/20'}
                        >
                            {/* Actions Column */}
                            <td className="border-b border-r border-black p-1 align-middle text-center bg-white">
                                <div className="flex flex-col items-center justify-center gap-1 py-1">
                                    <button
                                        type="button"
                                        onClick={() => handleAdd(idx)}
                                        className="w-6 h-6 rounded-md border border-slate-300 bg-white hover:bg-blue-50 hover:border-blue-400 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs group focus:outline-none"
                                        title="Insert row above"
                                        aria-label={`Insert row above row ${idx + 1}`}
                                    >
                                        <Plus className="w-3.5 h-3.5 stroke-[2] text-slate-500 group-hover:text-blue-600 transition-colors" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(idx)}
                                        className="w-6 h-6 rounded-md border border-slate-300 bg-white hover:bg-rose-50 hover:border-rose-400 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs group focus:outline-none"
                                        title="Delete row"
                                        aria-label={`Delete row ${idx + 1}`}
                                    >
                                        <Trash2 className="w-3.5 h-3.5 stroke-[1.8] text-slate-500 group-hover:text-rose-600 transition-colors" />
                                    </button>
                                </div>
                            </td>

                            {/* S. No. */}
                            <td className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.sNo || `${idx + 1}`}
                                    placeholder={`${idx + 1}`}
                                    onChange={(e) => onRowChange(idx, 'sNo', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1 text-center text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Characteristics (spans 2 cols) */}
                            <td colSpan={2} className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.characteristics || ''}
                                    onChange={(e) => onRowChange(idx, 'characteristics', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1.5 text-left text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Specified (spans 2 cols) */}
                            <td colSpan={2} className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.specified || ''}
                                    onChange={(e) => onRowChange(idx, 'specified', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1 text-center text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Actual (spans 2 cols) */}
                            <td colSpan={2} className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.actual || ''}
                                    onChange={(e) => onRowChange(idx, 'actual', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1 text-center text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Status (1 col) */}
                            <td className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.status || ''}
                                    onChange={(e) => onRowChange(idx, 'status', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1 text-center text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Remarks (1 col) */}
                            <td className="border-b border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.remarks || ''}
                                    onChange={(e) => onRowChange(idx, 'remarks', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1 text-left text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>
                        </tr>
                    );
                })}

                {/* FOOTER ROW 1: Headers (Deptt:, REQUEST BY:, APPROVED BY:) */}
                <tr style={{ height: '22px' }} className="text-[12px] bg-slate-50/40">
                    <td
                        colSpan={2}
                        className="border-b border-r border-black p-1 text-center align-middle font-normal"
                    >
                        Deptt:
                    </td>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black p-1 text-center align-middle font-normal tracking-wide"
                    >
                        REQUEST BY:
                    </td>
                    <td
                        colSpan={4}
                        className="border-b border-black p-1 text-center align-middle font-normal tracking-wide"
                    >
                        APPROVED BY:
                    </td>
                </tr>

                {/* FOOTER ROW 2: Signature Space */}
                <tr style={{ height: '42px' }}>
                    <td
                        colSpan={2}
                        className="border-b border-r border-black p-1 align-bottom text-center"
                    >
                        <input
                            type="text"
                            value={formData.deptt || ''}
                            onChange={(e) => onFormChange('deptt', e.target.value)}
                            className="w-full bg-transparent border-0 outline-none text-center text-[12px] font-normal text-black focus:bg-blue-50/40"
                        />
                    </td>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black p-1 align-bottom text-center"
                    >
                        <input
                            type="text"
                            value={formData.requestBy || ''}
                            onChange={(e) => onFormChange('requestBy', e.target.value)}
                            className="w-full bg-transparent border-0 outline-none text-center text-[12px] font-normal text-black focus:bg-blue-50/40"
                        />
                    </td>
                    <td
                        colSpan={4}
                        className="border-b border-black p-1 align-bottom text-center"
                    >
                        <input
                            type="text"
                            value={formData.approvedBy || ''}
                            onChange={(e) => onFormChange('approvedBy', e.target.value)}
                            className="w-full bg-transparent border-0 outline-none text-center text-[12px] font-normal text-black focus:bg-blue-50/40"
                        />
                    </td>
                </tr>

                {/* FOOTER ROW 3: Document Control Metadata */}
                <tr style={{ height: '22px' }} className="text-[10px] sm:text-[11px] bg-white">
                    <td className="border-r border-black px-1.5 py-0.5 align-middle text-left font-normal select-none">
                        FRM/QA/087
                    </td>
                    <td className="border-r border-black p-0"></td>
                    <td className="border-r border-black p-0"></td>
                    <td className="border-r border-black p-0"></td>
                    <td className="border-r border-black p-0"></td>
                    <td className="border-r border-black px-0.5 py-0.5 align-middle text-center font-normal select-none">
                        REV.NO.:00
                    </td>
                    <td className="border-r border-black p-0"></td>
                    <td className="border-r border-black p-0"></td>
                    <td className="border-r border-black px-0.5 py-0.5 align-middle text-center font-normal select-none whitespace-nowrap">
                        Rev. Date 19.1.11
                    </td>
                    <td className="p-0"></td>
                </tr>
            </tbody>
        </table>
    );
}
