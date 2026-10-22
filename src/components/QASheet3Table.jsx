import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import DatePickerInput from './DatePickerInput';
import TimePickerInput from './TimePickerInput';

export default function QASheet3Table({
    unit = 'Bawal',
    formData = {},
    rows = [],
    onFormChange,
    onRowChange,
    onAddRow,
    onDeleteRow,
    searchQuery = '',
}) {
    // S.No. table displays active rows, defaulting to 5 blank rows if empty
    const displayRows = React.useMemo(() => {
        if (Array.isArray(rows) && rows.length > 0) {
            return rows;
        }
        return Array.from({ length: 5 }, (_, idx) => ({
            sNo: `${idx + 1}`,
            requiredTest: '',
            standardName: '',
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
            (row.requiredTest && row.requiredTest.toLowerCase().includes(q)) ||
            (row.standardName && row.standardName.toLowerCase().includes(q)) ||
            (row.actual && row.actual.toLowerCase().includes(q)) ||
            (row.status && row.status.toLowerCase().includes(q)) ||
            (row.remarks && row.remarks.toLowerCase().includes(q))
        );
    };

    const handleCheckboxToggle = (field) => {
        onFormChange(field, !formData[field]);
    };

    const handleYesNoToggle = (field, val) => {
        onFormChange(field, formData[field] === val ? '' : val);
    };

    return (
        <table
            className="w-full border-collapse border-0 table-fixed text-[12px] leading-tight select-text text-black"
            style={{
                borderCollapse: 'collapse',
                fontFamily: "Arial, 'Segoe UI', Helvetica, sans-serif",
            }}
        >
            {/* 7 Columns matching the table section and aligned with the 50% center-divider:
                Left half (50%):
                  Col 1: Actions (~5%)
                  Col 2: S. No. (~5%)
                  Col 3: Required test (~16%)
                  Col 4: Standard Name/Drawing/MISP/ISP (~24%)
                Right half (50%):
                  Col 5: Actual (~32%)
                  Col 6: Status (~9%)
                  Col 7: Remarks (~9%)
            */}
            <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '5%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '24%' }} />
                <col style={{ width: '32%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '9%' }} />
            </colgroup>

            <tbody>
                {/* TOP HEADER ROW: FURUKAWA MINDA ELECTRIC PVT. LTD. */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={7}
                        className="border-b border-black px-3 py-1 text-right align-middle font-bold text-[13px] sm:text-[14px] uppercase tracking-wide text-black bg-white"
                    >
                        FURUKAWA MINDA ELECTRIC PVT. LTD.
                    </td>
                </tr>

                {/* HEADER SECTION (Row 1: Main Title + 2-Row Date/Time, Row 2: 4 Option Boxes with ☐) */}
                <tr className="p-0 border-0">
                    <td colSpan={7} className="p-0 border-0" style={{ padding: 0 }}>
                        <table
                            className="w-full border-collapse border-0 table-fixed text-[12px] leading-tight select-text text-black m-0"
                            style={{
                                borderCollapse: 'collapse',
                                fontFamily: "Arial, 'Segoe UI', Helvetica, sans-serif",
                            }}
                        >
                            <colgroup>
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '7%' }} />
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '7%' }} />
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '7%' }} />
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '7%' }} />
                            </colgroup>
                            <tbody>
                                {/* ROW 1: Main Title (Row 1) + Date/Time 2-Row Box on Top-Right */}
                                <tr>
                                    <td
                                        colSpan={6}
                                        rowSpan={2}
                                        className="border-b border-r border-black p-2 text-center align-middle font-bold text-[20px] sm:text-[22px] tracking-wide text-black bg-white"
                                        style={{ height: '56px' }}
                                    >
                                        Requisition slip for QA Lab
                                    </td>
                                    {/* Date */}
                                    <td
                                        colSpan={2}
                                        className="border-b border-black p-0 align-middle text-[12px]"
                                        style={{ height: '28px' }}
                                    >
                                        <div className="flex items-center h-full px-2">
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
                                <tr>
                                    {/* Time */}
                                    <td
                                        colSpan={2}
                                        className="border-b border-black p-0 align-middle text-[12px]"
                                        style={{ height: '28px' }}
                                    >
                                        <div className="flex items-center h-full px-2">
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

                                {/* ROW 2: Selection Checkboxes: New Development ☐ | CARV ☐ | Running Part ☐ | New applicator ☐ */}
                                <tr style={{ height: '34px' }}>
                                    {/* New Development Label */}
                                    <td
                                        onClick={() => handleCheckboxToggle('newDevelopment')}
                                        className="border-b border-r border-black px-2 py-0.5 text-left align-middle select-none text-[11px] sm:text-[12px] cursor-pointer hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-normal text-black leading-[1.15] block">
                                            New<br />Development
                                        </span>
                                    </td>
                                    {/* New Development Checkbox Box (☐) */}
                                    <td
                                        onClick={() => handleCheckboxToggle('newDevelopment')}
                                        className="border-b border-r border-black p-0 text-center align-middle cursor-pointer hover:bg-slate-50 transition-colors"
                                        title="Toggle New Development"
                                    >
                                        <span className={`text-[17px] sm:text-[18px] leading-none select-none ${formData.newDevelopment ? 'text-blue-600 font-bold' : 'text-slate-800'}`}>
                                            {formData.newDevelopment ? '☑' : '☐'}
                                        </span>
                                    </td>

                                    {/* CARV Label */}
                                    <td
                                        onClick={() => handleCheckboxToggle('carv')}
                                        className="border-b border-r border-black px-2 py-0.5 text-center align-middle select-none text-[11px] sm:text-[12px] cursor-pointer hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-normal text-black">CARV</span>
                                    </td>
                                    {/* CARV Checkbox Box (☐) */}
                                    <td
                                        onClick={() => handleCheckboxToggle('carv')}
                                        className="border-b border-r border-black p-0 text-center align-middle cursor-pointer hover:bg-slate-50 transition-colors"
                                        title="Toggle CARV"
                                    >
                                        <span className={`text-[17px] sm:text-[18px] leading-none select-none ${formData.carv ? 'text-blue-600 font-bold' : 'text-slate-800'}`}>
                                            {formData.carv ? '☑' : '☐'}
                                        </span>
                                    </td>

                                    {/* Running Part Label */}
                                    <td
                                        onClick={() => handleCheckboxToggle('runningPart')}
                                        className="border-b border-r border-black px-2 py-0.5 text-left align-middle select-none text-[11px] sm:text-[12px] cursor-pointer hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-normal text-black">Running Part</span>
                                    </td>
                                    {/* Running Part Checkbox Box (☐) */}
                                    <td
                                        onClick={() => handleCheckboxToggle('runningPart')}
                                        className="border-b border-r border-black p-0 text-center align-middle cursor-pointer hover:bg-slate-50 transition-colors"
                                        title="Toggle Running Part"
                                    >
                                        <span className={`text-[17px] sm:text-[18px] leading-none select-none ${formData.runningPart ? 'text-blue-600 font-bold' : 'text-slate-800'}`}>
                                            {formData.runningPart ? '☑' : '☐'}
                                        </span>
                                    </td>

                                    {/* New applicator Label */}
                                    <td
                                        onClick={() => handleCheckboxToggle('newApplicator')}
                                        className="border-b border-r border-black px-2 py-0.5 text-left align-middle select-none text-[11px] sm:text-[12px] cursor-pointer hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-normal text-black">New applicator</span>
                                    </td>
                                    {/* New applicator Checkbox Box (☐) */}
                                    <td
                                        onClick={() => handleCheckboxToggle('newApplicator')}
                                        className="border-b border-black p-0 text-center align-middle cursor-pointer hover:bg-slate-50 transition-colors"
                                        title="Toggle New applicator"
                                    >
                                        <span className={`text-[17px] sm:text-[18px] leading-none select-none ${formData.newApplicator ? 'text-blue-600 font-bold' : 'text-slate-800'}`}>
                                            {formData.newApplicator ? '☑' : '☐'}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                {/* ROW 3: Project Name : | Submission Frequency : */}
                <tr style={{ height: '26px' }}>
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
                        colSpan={3}
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

                {/* ROW 4: Part Name : | Part No. : */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
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
                        colSpan={3}
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

                {/* ROW 5: Product Type : | No of Cavity: */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black p-0 align-middle text-[12px]"
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
                    <td
                        colSpan={3}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                No of Cavity:
                            </span>
                            <input
                                type="text"
                                value={formData.noOfCavity || ''}
                                onChange={(e) => onFormChange('noOfCavity', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 6: Lot No: | Nos. of Sample : */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Lot No:
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
                        colSpan={3}
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

                {/* ROW 7: Lot Date: | Manufacturing Location: */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none pr-1">
                                Lot Date:
                            </span>
                            <DatePickerInput
                                value={formData.lotDate || ''}
                                onChange={(val) => onFormChange('lotDate', val)}
                            />
                        </div>
                    </td>
                    <td
                        colSpan={3}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Manufacturing Location:
                            </span>
                            <input
                                type="text"
                                value={formData.manufacturingLocation || ''}
                                onChange={(e) => onFormChange('manufacturingLocation', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 8: Material Name: | Material Grade/Class: */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Material Name:
                            </span>
                            <input
                                type="text"
                                value={formData.materialName || ''}
                                onChange={(e) => onFormChange('materialName', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                    <td
                        colSpan={3}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Material Grade/Class:
                            </span>
                            <input
                                type="text"
                                value={formData.materialGradeClass || ''}
                                onChange={(e) => onFormChange('materialGradeClass', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* ROW 9: FME Unique part: YES / NO | FAS Unique part: YES / NO */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                FME Unique part:
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('fmeUniquePart', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.fmeUniquePart === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('fmeUniquePart', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.fmeUniquePart === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                    <td
                        colSpan={3}
                        className="border-b border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                FAS Unique part:
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('fasUniquePart', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.fasUniquePart === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('fasUniquePart', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.fasUniquePart === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>

                {/* ROW 10: Customer directed part: YES / NO | Supplier Inspection report: YES / NO */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                Customer directed part:
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('customerDirectedPart', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.customerDirectedPart === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('customerDirectedPart', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.customerDirectedPart === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                    <td
                        colSpan={3}
                        className="border-b border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                Supplier Inspection report:
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('supplierInspectionReport', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.supplierInspectionReport === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('supplierInspectionReport', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.supplierInspectionReport === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>

                {/* ROW 11: MTC received: YES / NO | (blank cell) */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                MTC received:
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('mtcReceived', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.mtcReceived === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('mtcReceived', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.mtcReceived === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                    <td colSpan={3} className="border-b border-black p-0"></td>
                </tr>

                {/* ROW 12: Part applicability matrix Received: YES / NO | Testing standard Received YES / NO */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                Part applicability matrix Received:
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('partApplicabilityMatrixReceived', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.partApplicabilityMatrixReceived === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('partApplicabilityMatrixReceived', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.partApplicabilityMatrixReceived === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                    <td
                        colSpan={3}
                        className="border-b border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                Testing standard Received
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('testingStandardReceived', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.testingStandardReceived === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('testingStandardReceived', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.testingStandardReceived === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>

                {/* ROW 13: Testing method YES / NO | Jig/Fixture requirement YES / NO */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                Testing method
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('testingMethod', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.testingMethod === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('testingMethod', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.testingMethod === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                    <td
                        colSpan={3}
                        className="border-b border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                Jig/Fixture requirement
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('jigFixtureRequirement', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.jigFixtureRequirement === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('jigFixtureRequirement', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.jigFixtureRequirement === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>

                {/* ROW 14: PPAP Doc applicable: YES / NO | PPAP Doc Received: YES / NO */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
                        className="border-b border-r border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                PPAP Doc applicable:
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('ppapDocApplicable', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.ppapDocApplicable === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('ppapDocApplicable', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.ppapDocApplicable === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                    <td
                        colSpan={3}
                        className="border-b border-black px-1.5 py-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center justify-between h-full select-none">
                            <span className="font-normal text-black whitespace-nowrap">
                                PPAP Doc Received:
                            </span>
                            <div className="flex items-center gap-1.5 font-normal text-black">
                                <span
                                    onClick={() => handleYesNoToggle('ppapDocReceived', 'YES')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.ppapDocReceived === 'YES'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    YES
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => handleYesNoToggle('ppapDocReceived', 'NO')}
                                    className={`cursor-pointer px-1.5 py-0.5 rounded ${
                                        formData.ppapDocReceived === 'NO'
                                            ? 'font-bold bg-blue-100 text-blue-900 ring-1 ring-blue-400'
                                            : 'hover:bg-slate-100'
                                    }`}
                                >
                                    NO
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>

                {/* ROW 15: Requested Name : | Received By : */}
                <tr style={{ height: '26px' }}>
                    <td
                        colSpan={4}
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
                        colSpan={3}
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

                {/* ROW 16: Purpose for testing:- (full width) */}
                <tr style={{ height: '28px' }}>
                    <td
                        colSpan={7}
                        className="border-b border-black p-0 align-middle text-[12px]"
                    >
                        <div className="flex items-center h-full px-1.5">
                            <span className="font-normal text-black whitespace-nowrap select-none">
                                Purpose for testing:-
                            </span>
                            <input
                                type="text"
                                value={formData.purposeForTesting || ''}
                                onChange={(e) => onFormChange('purposeForTesting', e.target.value)}
                                className="w-full h-full bg-transparent border-0 outline-none px-1.5 text-black font-normal text-[12px] focus:bg-blue-50/50"
                            />
                        </div>
                    </td>
                </tr>

                {/* TABLE HEADER ROW: Actions | S. No. | Required test | Standard Name/Drawing/MISP/ISP || Actual | Status | Remarks */}
                <tr style={{ height: '30px' }} className="font-normal text-[12px] text-center bg-slate-50/40">
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        Actions
                    </td>
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        S. No.
                    </td>
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        Required test
                    </td>
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
                        Standard Name/Drawing/MISP/ISP
                    </td>
                    <td className="border-b border-r border-black p-1 text-center align-middle font-normal select-none">
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

                            {/* Required test */}
                            <td className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.requiredTest || ''}
                                    onChange={(e) => onRowChange(idx, 'requiredTest', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1 text-left text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Standard Name/Drawing/MISP/ISP */}
                            <td className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.standardName || ''}
                                    onChange={(e) => onRowChange(idx, 'standardName', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1.5 text-center text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Actual */}
                            <td className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.actual || ''}
                                    onChange={(e) => onRowChange(idx, 'actual', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1 text-center text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Status */}
                            <td className="border-b border-r border-black p-0 align-middle">
                                <input
                                    type="text"
                                    value={row.status || ''}
                                    onChange={(e) => onRowChange(idx, 'status', e.target.value)}
                                    className="w-full h-full bg-transparent border-0 outline-none px-1 text-center text-black font-normal text-[12px] focus:bg-blue-50/40"
                                />
                            </td>

                            {/* Remarks */}
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

                {/* FOOTER SECTION: 5 Distinct Columns Matching Reference Screenshot */}
                <tr className="p-0 border-0">
                    <td colSpan={7} className="p-0 border-0" style={{ padding: 0 }}>
                        <table
                            className="w-full border-collapse border-0 table-fixed text-[12px] leading-tight select-text text-black m-0"
                            style={{
                                borderCollapse: 'collapse',
                                fontFamily: "Arial, 'Segoe UI', Helvetica, sans-serif",
                            }}
                        >
                            <colgroup>
                                <col style={{ width: '12%' }} />
                                <col style={{ width: '19%' }} />
                                <col style={{ width: '19%' }} />
                                <col style={{ width: '25%' }} />
                                <col style={{ width: '25%' }} />
                            </colgroup>
                            <tbody>
                                {/* 1. HEADER LABEL ROW: Deptt: | REQUEST BY: | CHECKED BY: | VERIFIED BY: | APPROVED BY: */}
                                <tr style={{ height: '26px' }} className="text-[11px] sm:text-[12px]">
                                    <td className="border-t border-b border-r border-black px-1.5 py-1 text-center align-middle font-normal select-none">
                                        Deptt:
                                    </td>
                                    <td className="border-t border-b border-r border-black px-1.5 py-1 text-center align-middle font-normal tracking-wide select-none">
                                        REQUEST BY:
                                    </td>
                                    <td className="border-t border-b border-r border-black px-1.5 py-1 text-center align-middle font-normal tracking-wide select-none">
                                        CHECKED BY:
                                    </td>
                                    <td className="border-t border-b border-r border-black px-1.5 py-1 text-center align-middle font-normal tracking-wide select-none">
                                        VERIFIED BY:
                                    </td>
                                    <td className="border-t border-b border-black px-1.5 py-1 text-center align-middle font-normal tracking-wide select-none">
                                        APPROVED BY:
                                    </td>
                                </tr>

                                {/* 2. SIGNATURE & NAME BOX (MIDDLE SPACE) */}
                                <tr style={{ height: '70px' }}>
                                    {/* Deptt */}
                                    <td className="border-b border-r border-black p-1 align-bottom text-center">
                                        <input
                                            type="text"
                                            value={formData.deptt || ''}
                                            onChange={(e) => onFormChange('deptt', e.target.value)}
                                            className="w-full bg-transparent border-0 outline-none text-center text-[12px] font-normal text-black focus:bg-blue-50/40"
                                        />
                                    </td>

                                    {/* REQUEST BY */}
                                    <td className="border-b border-r border-black p-1 align-bottom text-center">
                                        <input
                                            type="text"
                                            value={formData.requestBy || ''}
                                            onChange={(e) => onFormChange('requestBy', e.target.value)}
                                            className="w-full bg-transparent border-0 outline-none text-center text-[12px] font-normal text-black focus:bg-blue-50/40"
                                        />
                                    </td>

                                    {/* CHECKED BY */}
                                    <td className="border-b border-r border-black p-1 align-bottom text-center">
                                        <input
                                            type="text"
                                            value={formData.checkedBy || ''}
                                            onChange={(e) => onFormChange('checkedBy', e.target.value)}
                                            className="w-full bg-transparent border-0 outline-none text-center text-[12px] font-normal text-black focus:bg-blue-50/40"
                                        />
                                    </td>

                                    {/* VERIFIED BY with Pankaj Kamra at bottom right */}
                                    <td className="border-b border-r border-black p-1 relative align-bottom text-center">
                                        <input
                                            type="text"
                                            value={formData.verifiedBy && formData.verifiedBy !== 'Pankaj Kamra' ? formData.verifiedBy : ''}
                                            onChange={(e) => onFormChange('verifiedBy', e.target.value)}
                                            className="w-full bg-transparent border-0 outline-none text-center text-[12px] font-normal text-black focus:bg-blue-50/40 pb-5"
                                        />
                                        <span className="absolute bottom-1 right-2 text-[11px] sm:text-[12px] font-normal text-black pointer-events-none select-none">
                                            Pankaj Kamra
                                        </span>
                                    </td>

                                    {/* APPROVED BY with Yadvendar Yadav at bottom right */}
                                    <td className="border-b border-black p-1 relative align-bottom text-center">
                                        <input
                                            type="text"
                                            value={formData.approvedBy && formData.approvedBy !== 'Yadvendar Yadav' ? formData.approvedBy : ''}
                                            onChange={(e) => onFormChange('approvedBy', e.target.value)}
                                            className="w-full bg-transparent border-0 outline-none text-center text-[12px] font-normal text-black focus:bg-blue-50/40 pb-5"
                                        />
                                        <span className="absolute bottom-1 right-2 text-[11px] sm:text-[12px] font-normal text-black pointer-events-none select-none">
                                            Yadvendar Yadav
                                        </span>
                                    </td>
                                </tr>

                                {/* 3. DOCUMENT CONTROL ROW (BOTTOM ROW) */}
                                <tr style={{ height: '22px' }} className="text-[10px] sm:text-[11px] bg-white">
                                    {/* Column 1 (under Deptt): FRM/QA/087 */}
                                    <td className="border-r border-black px-1.5 py-0.5 align-middle text-left font-normal select-none whitespace-nowrap">
                                        FRM/QA/087
                                    </td>
                                    {/* Column 2 (under REQUEST BY): blank */}
                                    <td className="border-r border-black p-0"></td>
                                    {/* Column 3 (under CHECKED BY): REV.NO.:00 */}
                                    <td className="border-r border-black px-1.5 py-0.5 align-middle text-left font-normal select-none whitespace-nowrap">
                                        REV.NO.:00
                                    </td>
                                    {/* Column 4 (under VERIFIED BY): blank */}
                                    <td className="border-r border-black p-0"></td>
                                    {/* Column 5 (under APPROVED BY): Rev. Date 19.1.11 */}
                                    <td className="px-1.5 py-0.5 align-middle text-left font-normal select-none whitespace-nowrap">
                                        Rev. Date 19.1.11
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
