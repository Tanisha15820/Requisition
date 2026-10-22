import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QASheetTable from '../components/QASheetTable';
import QASheet3Table from '../components/QASheet3Table';
import {
    Building2,
    ChevronDown,
    FileSpreadsheet,
    Search,
    Check,
    CheckCircle2,
    X
} from 'lucide-react';

const createEmptyFormData = () => ({
    date: '',
    time: '',
    projectName: '',
    submissionFrequency: '',
    partName: '',
    partNo: '',
    productType: '',
    lotNo: '',
    nosOfSample: '',
    requestedName: '',
    receivedBy: '',
    purpose: '',
    deptt: '',
    requestBy: '',
    approvedBy: '',
});

const createEmptyRows = (count = 5) =>
    Array.from({ length: count }, (_, idx) => ({
        sNo: `${idx + 1}`,
        characteristics: '',
        specified: '',
        actual: '',
        status: '',
        remarks: '',
    }));

// Sheet 3 specific blank template
const createEmptySheet3FormData = () => ({
    date: '',
    time: '',
    newDevelopment: false,
    carv: false,
    runningPart: false,
    newApplicator: false,
    projectName: '',
    submissionFrequency: '',
    partName: '',
    partNo: '',
    productType: '',
    noOfCavity: '',
    lotNo: '',
    nosOfSample: '',
    lotDate: '',
    manufacturingLocation: '',
    materialName: '',
    materialGradeClass: '',
    fmeUniquePart: '',
    fasUniquePart: '',
    customerDirectedPart: '',
    supplierInspectionReport: '',
    mtcReceived: '',
    partApplicabilityMatrixReceived: '',
    testingStandardReceived: '',
    testingMethod: '',
    jigFixtureRequirement: '',
    ppapDocApplicable: '',
    ppapDocReceived: '',
    requestedName: '',
    receivedBy: '',
    purposeForTesting: '',
    deptt: '',
    requestBy: '',
    checkedBy: '',
    verifiedBy: '',
    approvedBy: '',
});

const createEmptySheet3Rows = (count = 5) =>
    Array.from({ length: count }, (_, idx) => ({
        sNo: `${idx + 1}`,
        requiredTest: '',
        standardName: '',
        actual: '',
        status: '',
        remarks: '',
    }));

// Clean blank template state for all sheets across units
const getInitialUnitData = () => ({
    Bawal: {
        'Event Test Requisition': {
            formData: createEmptySheet3FormData(),
            rows: createEmptySheet3Rows(5),
        },
        'General Test Requisition': {
            formData: createEmptyFormData(),
            rows: createEmptyRows(5),
        },
        'Sheet 1': {
            formData: createEmptyFormData(),
            rows: createEmptyRows(5),
        },
        'Sheet 2': {
            formData: createEmptyFormData(),
            rows: createEmptyRows(5),
        },
        'Sheet 3': {
            formData: createEmptySheet3FormData(),
            rows: createEmptySheet3Rows(5),
        },
    },
    Gujrat: {
        'Event Test Requisition': {
            formData: createEmptySheet3FormData(),
            rows: createEmptySheet3Rows(5),
        },
        'General Test Requisition': {
            formData: createEmptyFormData(),
            rows: createEmptyRows(5),
        },
        'Sheet 1': {
            formData: createEmptyFormData(),
            rows: createEmptyRows(5),
        },
        'Sheet 2': {
            formData: createEmptyFormData(),
            rows: createEmptyRows(5),
        },
        'Sheet 3': {
            formData: createEmptySheet3FormData(),
            rows: createEmptySheet3Rows(5),
        },
    },
});

export default function QARequisitionPage({ defaultTab = 'General Test Requisition' }) {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Unit Dropdown: options 'Bawal', 'Gujrat'. Default is 'Bawal'
    const [selectedUnit, setSelectedUnit] = useState('Bawal');
    const [unitDropdownOpen, setUnitDropdownOpen] = useState(false);

    // 2. Requisition Tabs: 'General Test Requisition' placed first on far left, 'Event Test Requisition' directly to its right
    const REQUISITION_TABS = [
        { id: 'General Test Requisition', label: 'General Test Requisition' },
        { id: 'Event Test Requisition', label: 'Event Test Requisition' },
    ];

    const [activeTab, setActiveTab] = useState(
        defaultTab === 'Event Test Requisition' || defaultTab === 'Sheet 3'
            ? 'Event Test Requisition'
            : 'General Test Requisition'
    );

    // Sub-sheet selector for General Test Requisition ('Sheet 2')
    const [generalSubSheet, setGeneralSubSheet] = useState('Sheet 2');

    // 4. Search query
    const [searchQuery, setSearchQuery] = useState('');

    // 5. Toast notification
    const [toastMessage, setToastMessage] = useState('');
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    // 6. Master data store separated by Unit and Sheet
    const [unitData, setUnitData] = useState(getInitialUnitData());

    // Handlers for active sheet form & row changes
    const handleFormChange = (field, value) => {
        if (!selectedUnit) return;
        setUnitData((prev) => ({
            ...prev,
            [selectedUnit]: {
                ...prev[selectedUnit],
                [activeTab]: {
                    ...prev[selectedUnit][activeTab],
                    formData: {
                        ...prev[selectedUnit][activeTab].formData,
                        [field]: value,
                    },
                },
            },
        }));
    };

    const handleRowChange = (index, field, value) => {
        if (!selectedUnit) return;
        setUnitData((prev) => {
            const currentRows = [...prev[selectedUnit][activeTab].rows];
            currentRows[index] = {
                ...currentRows[index],
                [field]: value,
            };
            return {
                ...prev,
                [selectedUnit]: {
                    ...prev[selectedUnit],
                    [activeTab]: {
                        ...prev[selectedUnit][activeTab],
                        rows: currentRows,
                    },
                },
            };
        });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'Sheet 3' && location.pathname !== '/qasheet3') {
            navigate('/qasheet3', { replace: true });
        } else if (tab === 'Sheet 2' && location.pathname !== '/qasheet2') {
            navigate('/qasheet2', { replace: true });
        }
    };

    const handlePrint = () => {
        window.print();
    };

    // Export active sheet to CSV
    const handleExportExcel = () => {
        if (!selectedUnit) {
            showToast('Please select a unit before exporting.');
            return;
        }

        const currentSheet =
            unitData[selectedUnit]?.[activeTab] ||
            (activeTab === 'Event Test Requisition' || activeTab === 'Sheet 3'
                ? unitData[selectedUnit]?.['Sheet 3']
                : unitData[selectedUnit]?.['Sheet 1']);
        if (!currentSheet) return;
        const { formData, rows } = currentSheet;

        let csv = `sep=,\n`;

        if (activeTab === 'Event Test Requisition' || activeTab === 'Sheet 3') {
            csv += `"REQUISITION SLIP FOR QA LAB - EVENT TEST REQUISITION (${selectedUnit.toUpperCase()})"\n`;
            csv += `"Date:","${formData.date || ''}","Time:","${formData.time || ''}"\n`;
            csv += `"New Development:","${formData.newDevelopment ? 'YES' : 'NO'}","CARV:","${formData.carv ? 'YES' : 'NO'}","Running Part:","${formData.runningPart ? 'YES' : 'NO'}","New applicator:","${formData.newApplicator ? 'YES' : 'NO'}"\n`;
            csv += `"Project Name:","${formData.projectName || ''}","Submission Frequency:","${formData.submissionFrequency || ''}"\n`;
            csv += `"Part Name:","${formData.partName || ''}","Part No.:","${formData.partNo || ''}"\n`;
            csv += `"Product Type:","${formData.productType || ''}","No of Cavity:","${formData.noOfCavity || ''}"\n`;
            csv += `"Lot No:","${formData.lotNo || ''}","Nos of Sample:","${formData.nosOfSample || ''}"\n`;
            csv += `"Lot Date:","${formData.lotDate || ''}","Manufacturing Location:","${formData.manufacturingLocation || ''}"\n`;
            csv += `"Material Name:","${formData.materialName || ''}","Material Grade/Class:","${formData.materialGradeClass || ''}"\n`;
            csv += `"FME Unique part:","${formData.fmeUniquePart || ''}","FAS Unique part:","${formData.fasUniquePart || ''}"\n`;
            csv += `"Customer directed part:","${formData.customerDirectedPart || ''}","Supplier Inspection report:","${formData.supplierInspectionReport || ''}"\n`;
            csv += `"MTC received:","${formData.mtcReceived || ''}"\n`;
            csv += `"Part applicability matrix Received:","${formData.partApplicabilityMatrixReceived || ''}","Testing standard Received:","${formData.testingStandardReceived || ''}"\n`;
            csv += `"Testing method:","${formData.testingMethod || ''}","Jig/Fixture requirement:","${formData.jigFixtureRequirement || ''}"\n`;
            csv += `"PPAP Doc applicable:","${formData.ppapDocApplicable || ''}","PPAP Doc Received:","${formData.ppapDocReceived || ''}"\n`;
            csv += `"Requested Name:","${formData.requestedName || ''}","Received By:","${formData.receivedBy || ''}"\n`;
            csv += `"Purpose for testing:-","${formData.purposeForTesting || ''}"\n\n`;

            csv += `"S. No.","Required test","Standard Name/Drawing/MISP/ISP","Actual","Status","Remarks"\n`;
            rows.forEach((r) => {
                if (r.requiredTest || r.standardName || r.actual || r.status || r.remarks) {
                    csv += `"${r.sNo}","${(r.requiredTest || '').replace(/"/g, '""')}","${(r.standardName || '').replace(/"/g, '""')}","${(r.actual || '').replace(/"/g, '""')}","${r.status || ''}","${(r.remarks || '').replace(/"/g, '""')}"\n`;
                }
            });

            csv += `\n"Deptt:","${formData.deptt || ''}","Request By:","${formData.requestBy || ''}","Checked By:","${formData.checkedBy || ''}","Verified By:","${formData.verifiedBy || 'Pankaj Kamra'}","Approved By:","${formData.approvedBy || 'Yadvendar Yadav'}"\n`;
        } else {
            csv += `"Q.A. LAB REQUISITION SLIP - GENERAL TEST REQUISITION (${selectedUnit.toUpperCase()})"\n`;
            csv += `"Date:","${formData.date || ''}","Time:","${formData.time || ''}"\n`;
            csv += `"Project Name:","${formData.projectName || ''}","Submission Frequency:","${formData.submissionFrequency || ''}"\n`;
            csv += `"Part Name:","${formData.partName || ''}","Part No.:","${formData.partNo || ''}"\n`;
            csv += `"Product Type:","${formData.productType || ''}"\n`;
            csv += `"Lot No:","${formData.lotNo || ''}","Nos of Sample:","${formData.nosOfSample || ''}"\n`;
            csv += `"Requested Name:","${formData.requestedName || ''}","Received By:","${formData.receivedBy || ''}"\n`;
            csv += `"Purpose:","${formData.purpose || ''}"\n\n`;

            csv += `"S. No.","Characteristics","Specified","Actual","Status","Remarks"\n`;
            rows.forEach((r) => {
                if (r.characteristics || r.specified || r.actual || r.status || r.remarks) {
                    csv += `"${r.sNo}","${(r.characteristics || '').replace(/"/g, '""')}","${(r.specified || '').replace(/"/g, '""')}","${(r.actual || '').replace(/"/g, '""')}","${r.status || ''}","${(r.remarks || '').replace(/"/g, '""')}"\n`;
                }
            });

            csv += `\n"Deptt:","${formData.deptt || ''}","Request By:","${formData.requestBy || ''}","Approved By:","${formData.approvedBy || ''}"\n`;
        }

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `QA_Requisition_${selectedUnit}_${activeTab.replace(/\s+/g, '_')}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        showToast(`Exported ${selectedUnit} ${activeTab} to CSV successfully!`);
    };

    // Handler to insert a new blank row immediately above the specified row index
    const handleAddRow = (index) => {
        if (!selectedUnit) return;
        setUnitData((prev) => {
            const unitObj = prev[selectedUnit] || {};
            const sheetObj = unitObj[activeTab] || {};
            const currentRows = [...(sheetObj.rows || [])];

            const isSheet3 = activeTab === 'Event Test Requisition' || activeTab === 'Sheet 3';
            const newRow = isSheet3
                ? {
                    sNo: `${index + 1}`,
                    requiredTest: '',
                    standardName: '',
                    actual: '',
                    status: '',
                    remarks: '',
                }
                : {
                    sNo: `${index + 1}`,
                    characteristics: '',
                    specified: '',
                    actual: '',
                    status: '',
                    remarks: '',
                };

            currentRows.splice(index, 0, newRow);
            const reindexed = currentRows.map((r, idx) => ({
                ...r,
                sNo: `${idx + 1}`,
            }));

            return {
                ...prev,
                [selectedUnit]: {
                    ...unitObj,
                    [activeTab]: {
                        ...sheetObj,
                        rows: reindexed,
                    },
                },
            };
        });
        showToast(`Inserted a new row above row ${index + 1}`);
    };

    // Handler to delete a specific row by index
    const handleDeleteRow = (index) => {
        if (!selectedUnit) return;
        setUnitData((prev) => {
            const unitObj = prev[selectedUnit] || {};
            const sheetObj = unitObj[activeTab] || {};
            let currentRows = [...(sheetObj.rows || [])];
            currentRows.splice(index, 1);

            const isSheet3 = activeTab === 'Event Test Requisition' || activeTab === 'Sheet 3';
            if (currentRows.length === 0) {
                const blankRow = isSheet3
                    ? { sNo: '1', requiredTest: '', standardName: '', actual: '', status: '', remarks: '' }
                    : { sNo: '1', characteristics: '', specified: '', actual: '', status: '', remarks: '' };
                currentRows = [blankRow];
            }

            const reindexed = currentRows.map((r, idx) => ({
                ...r,
                sNo: `${idx + 1}`,
            }));

            return {
                ...prev,
                [selectedUnit]: {
                    ...unitObj,
                    [activeTab]: {
                        ...sheetObj,
                        rows: reindexed,
                    },
                },
            };
        });
        showToast(`Deleted row ${index + 1}`);
    };

    // Get current data safely
    const currentSheetData =
        selectedUnit && unitData[selectedUnit] ? unitData[selectedUnit][activeTab] : null;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-black">
            {/* Content Area with soft light-gray background */}
            <main className="min-h-screen w-full p-3 sm:p-5 md:p-6 bg-[#F8FAFC]">
                {/* Toast Notification */}
                {toastMessage && (
                    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{toastMessage}</span>
                        <button
                            onClick={() => setToastMessage('')}
                            className="ml-2 text-slate-400 hover:text-white"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}

                {/* Main Page Content Card matching reference design */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 flex flex-col gap-4">
                    {/* 1. TOP CONTROL BAR: Unit Dropdown */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 no-print">
                        {/* Left: Unit Dropdown Selector */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUnitDropdownOpen(!unitDropdownOpen)}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition-all shadow-2xs cursor-pointer"
                                title="Select Plant / Unit"
                            >
                                <Building2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                <span>
                                    Unit:{' '}
                                    <strong
                                        className={
                                            selectedUnit
                                                ? 'text-slate-900 font-semibold'
                                                : 'text-slate-400 font-normal'
                                        }
                                    >
                                        {selectedUnit || 'Select Unit'}
                                    </strong>
                                </span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-slate-400 stroke-[2.5] transition-transform duration-200 ${unitDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {unitDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setUnitDropdownOpen(false)}
                                    />
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs sm:text-sm font-medium animate-in fade-in duration-150">
                                        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                            Select Plant / Unit
                                        </div>
                                        {['Bawal', 'Gujrat'].map((unit) => {
                                            const isSelected = selectedUnit === unit;
                                            return (
                                                <button
                                                    key={unit}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedUnit(unit);
                                                        setUnitDropdownOpen(false);
                                                        showToast(`Switched to Unit: ${unit}`);
                                                    }}
                                                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between transition-colors cursor-pointer ${isSelected
                                                            ? 'bg-blue-50/80 text-blue-700 font-semibold'
                                                            : 'text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`w-2 h-2 rounded-full ${isSelected
                                                                    ? 'bg-blue-600'
                                                                    : 'bg-slate-300'
                                                                }`}
                                                        />
                                                        <span>{unit}</span>
                                                    </div>
                                                    {isSelected && (
                                                        <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                                                    )}
                                                </button>
                                            );
                                        })}

                                        <div className="my-1 border-t border-slate-100"></div>

                                        {/* Clear selection to test empty state */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedUnit('');
                                                setUnitDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-3.5 py-1.5 text-xs text-slate-500 hover:bg-slate-50 hover:text-slate-700 flex items-center gap-2 cursor-pointer"
                                        >
                                            <span>None (Clear selection)</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 2. REQUISITION TABS: 'General Test Requisition' first on far left, 'Event Test Requisition' directly to its right */}
                    <div className="flex items-center no-print max-w-full overflow-x-auto scrollbar-none pb-0.5">
                        <div
                            role="tablist"
                            aria-label="Requisition Type Tabs"
                            className="bg-[#F8FAFC] sm:bg-slate-50/80 border border-slate-200/90 rounded-2xl p-1 inline-flex items-center gap-1 sm:gap-1.5 shadow-2xs flex-nowrap"
                        >
                            {REQUISITION_TABS.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        role="tab"
                                        aria-selected={isActive}
                                        id={`qa-tab-${tab.id.toLowerCase().replace(/\s+/g, '-')}`}
                                        type="button"
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            showToast(`Showing: ${tab.label}`);
                                        }}
                                        className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap select-none flex-shrink-0 ${
                                            isActive
                                                ? 'bg-white text-slate-900 font-bold border border-slate-200/90 shadow-xs ring-1 ring-slate-900/5'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent font-medium'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. SEARCH & ACTION BUTTON BAR right above sheet container */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 no-print">
                        {/* Search bar matching reference screenshot */}
                        <div className="relative flex-1 min-w-[240px] max-w-xl">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by topic, description, created by, or part no..."
                                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800 transition-all placeholder:text-slate-400"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
                                    title="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Action Buttons: Export Excel */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleExportExcel}
                                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition-all shadow-2xs cursor-pointer"
                                title="Export Active Sheet to CSV/Excel"
                            >
                                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                                <span>Export Excel</span>
                            </button>
                        </div>
                    </div>

                    {/* 4. CONDITIONAL CONTENT AREA */}
                    {!selectedUnit ? (
                        /* Empty state when no unit is selected - exact match to the reference screenshot */
                        <div className="border border-slate-200/80 rounded-2xl bg-white/70 py-16 sm:py-20 px-6 flex flex-col items-center justify-center text-center shadow-2xs my-2">
                            {/* Soft building outline icon */}
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-4 shadow-2xs">
                                <Building2 className="w-8 h-8 text-slate-300 stroke-[1.6]" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-800">
                                Please Select a Unit
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
                                Select Gujrat or Bawal from the Unit dropdown above to display the records for that unit.
                            </p>
                            <div className="flex items-center gap-2.5 mt-5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedUnit('Bawal');
                                        showToast('Unit selected: Bawal');
                                    }}
                                    className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-all cursor-pointer"
                                >
                                    Select Bawal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedUnit('Gujrat');
                                        showToast('Unit selected: Gujrat');
                                    }}
                                    className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-all cursor-pointer"
                                >
                                    Select Gujrat
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Active checksheet table covering full width */
                        <div className="w-full overflow-x-auto pb-4 pt-1">
                            <div className="w-full min-w-[760px] bg-white border-2 border-black shadow-md select-text text-black print:shadow-none print:border-2 print:border-black print:w-full">
                                {activeTab === 'Event Test Requisition' || activeTab === 'Sheet 3' ? (
                                    <QASheet3Table
                                        unit={selectedUnit}
                                        formData={currentSheetData?.formData || createEmptySheet3FormData()}
                                        rows={currentSheetData?.rows || createEmptySheet3Rows(5)}
                                        onFormChange={handleFormChange}
                                        onRowChange={handleRowChange}
                                        onAddRow={handleAddRow}
                                        onDeleteRow={handleDeleteRow}
                                        searchQuery={searchQuery}
                                    />
                                ) : (
                                    <QASheetTable
                                        sheetType={activeTab === 'General Test Requisition' ? 'Sheet 1' : activeTab}
                                        unit={selectedUnit}
                                        formData={currentSheetData?.formData || createEmptyFormData()}
                                        rows={currentSheetData?.rows || createEmptyRows(5)}
                                        onFormChange={handleFormChange}
                                        onRowChange={handleRowChange}
                                        onAddRow={handleAddRow}
                                        onDeleteRow={handleDeleteRow}
                                        searchQuery={searchQuery}
                                        hasCompanyHeader={generalSubSheet === 'Sheet 2'}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
