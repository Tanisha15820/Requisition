import React from 'react';

export default function QASheetTable({
    sheetType = 'Sheet 1',
    unit = 'Bawal',
    formData = {},
    rows = [],
    onFormChange,
    onRowChange,
    searchQuery = '',
    hasCompanyHeader = false,
}) {
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
            {/* 9 Columns based on original spreadsheet structure:
                Col 1 (A): ~13.73%
                Col 2 (B): ~9.15%
                Col 3 (C): ~16.48%
                Col 4 (D): ~9.15%
                Col 5 (E): ~9.15%
                Col 6 (F): ~9.15%
                Col 7 (G): ~9.15%
                Col 8 (H): ~13.96%
                Col 9 (I): ~10.08%
            */}
            <colgroup>
                <col style={{ width: '13.73%' }} />
                <col style={{ width: '9.15%' }} />
                <col style={{ width: '16.48%' }} />
                <col style={{ width: '9.15%' }} />
                <col style={{ width: '9.15%' }} />
                <col style={{ width: '9.15%' }} />
                <col style={{ width: '9.15%' }} />
                <col style={{ width: '13.96%' }} />
                <col style={{ width: '10.08%' }} />
            </colgroup>

            <tbody>
                {/* Optional Company Header for Sheet 2 */}
                {hasCompanyHeader && (
                    <tr style={{ height: '14px' }}>
                        <td
                            colSpan={9}
                            className="border-b border-black px-1 py-0 text-right align-middle font-bold text-[11px] leading-none text-black"
                        >
                            FURUKAWA MINDA ELECTRIC PVT. LTD.
                        </td>
                    </tr>
                )}

                {/* ROW 1 & 2: Header Title + Date / Time Box */}
                <tr style={{ height: '24px' }}>
                    {/* Main Slip Title - spans 7 columns and 2 rows */}
                    <td
                        colSpan={7}
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
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Date:
                            </span>
                            <input
                                type="text"
                                value={formData.date || ''}
                                onChange={(e) => onFormChange('date', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
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
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Time:
                            </span>
                            <input
                                type="text"
                                value={formData.time || ''}
                                onChange={(e) => onFormChange('time', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 3: Project Name & Submission Frequency */}
                <tr style={{ height: '28px' }}>
                    <td
                        colSpan={4}
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
                        colSpan={4}
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
                        colSpan={9}
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
                        colSpan={4}
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
                        colSpan={4}
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
                        colSpan={9}
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
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal">
                        S. No.
                    </td>
                    <td colSpan={2} className="border-b border-r border-black p-1 text-center align-middle font-normal">
                        Characteristics
                    </td>
                    <td colSpan={2} className="border-b border-r border-black p-1 text-center align-middle font-normal">
                        Specified
                    </td>
                    <td colSpan={2} className="border-b border-r border-black p-1 text-center align-middle font-normal">
                        Actual
                    </td>
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal">
                        Status
                    </td>
                    <td className="border-b border-black p-1 text-center align-middle font-normal">
                        Remarks
                    </td>
                </tr>

                {/* ROWS 10 to 27: 18 Data Rows */}
                {rows.map((row, idx) => {
                    const matched = isRowMatch(row);
                    return (
                        <tr
                            key={idx}
                            style={{ height: '24px' }}
                            className={matched ? 'bg-amber-100/70 transition-colors' : ''}
                        >
                            {/* S. No. */}
                            <td className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.sNo || ''}
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
                        colSpan={3}
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
                        colSpan={3}
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
