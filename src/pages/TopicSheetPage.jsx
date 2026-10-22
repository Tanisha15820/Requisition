import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import QASheetTable from '../components/QASheetTable';
import QASheet3Table from '../components/QASheet3Table';
import {
    loadStoredTopics,
    saveStoredTopics,
    createBlankTopicSheets,
    createEmptyFormData,
    createEmptyRows,
    createEmptySheet3FormData,
    createEmptySheet3Rows,
    normalizeSheetRows,
} from '../data/topicStore';
import {
    ArrowLeft,
    Save,
    Search,
    CheckCircle2,
    X,
    FileSpreadsheet,
    Printer
} from 'lucide-react';

export default function TopicSheetPage({ defaultTab }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Search query
    const [searchQuery, setSearchQuery] = useState('');

    // 2. Zoom state
    const [zoom, setZoom] = useState(100);

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 10, 150));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 10, 60));
    };

    const handleResetZoom = () => {
        setZoom(100);
    };

    // 3. Toast notification
    const [toastMessage, setToastMessage] = useState('');
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    // 4. Load topic and its sheets
    const [topics, setTopics] = useState(loadStoredTopics());

    // Find current topic or create a fallback
    const currentTopic = topics.find((t) => t.id === id) || topics[0] || {
        id: id || 'default',
        topic: 'Q.A. LAB REQUISITION',
        unit: 'Bawal',
        category: 'Plant',
        requisitionType: 'General Test Requisition',
        description: '',
        date: '14 Oct 2026',
        time: '12:00 PM',
        createdByName: 'JOY DASTIDAR',
        createdById: 'ST080014',
        sheets: createBlankTopicSheets(),
    };

    // Determine requisition type (Event Test Requisition vs General Test Requisition)
    const routeReqType = location.state?.requisitionType;
    const requisitionType =
        routeReqType ||
        currentTopic.requisitionType ||
        (currentTopic.topic === 'Testing' ||
        currentTopic.topic === 'Testing 2' ||
        currentTopic.topic?.toLowerCase().includes('general') ||
        currentTopic.topic?.toLowerCase().includes('routine')
            ? 'General Test Requisition'
            : 'Event Test Requisition');

    const isEvent = requisitionType === 'Event Test Requisition';
    const isGeneral = requisitionType === 'General Test Requisition';

    // Sheet selection logic:
    // Event Test Requisition -> Event Test sheet (Sheet 3)
    // General Test Requisition -> General Test sheet (Sheet 1)
    const effectiveDefaultTab = defaultTab || location.state?.defaultTab;
    const targetDefault = effectiveDefaultTab || (isEvent ? 'Sheet 3' : 'Sheet 1');
    const [activeTab, setActiveTab] = useState(targetDefault);

    useEffect(() => {
        if (effectiveDefaultTab && activeTab !== effectiveDefaultTab) {
            setActiveTab(effectiveDefaultTab);
        } else if (isEvent && activeTab !== 'Sheet 3') {
            setActiveTab('Sheet 3');
        } else if (isGeneral && activeTab !== 'Sheet 1') {
            setActiveTab('Sheet 1');
        }
    }, [id, requisitionType, effectiveDefaultTab]);

    // Ensure topic has sheets object initialized
    const sheetsData = currentTopic.sheets || createBlankTopicSheets();
    const rawSheet =
        sheetsData[activeTab] ||
        (activeTab === 'Sheet 3'
            ? { formData: createEmptySheet3FormData(), rows: createEmptySheet3Rows(5) }
            : { formData: createEmptyFormData(), rows: createEmptyRows(5) });
    const currentSheet = {
        ...rawSheet,
        rows: normalizeSheetRows(rawSheet.rows, activeTab === 'Sheet 3'),
    };

    // Handler to update form data for the active sheet in this topic
    const handleFormChange = (field, value) => {
        setTopics((prevTopics) => {
            const updated = prevTopics.map((t) => {
                if (t.id === currentTopic.id) {
                    const currentSheets = t.sheets || createBlankTopicSheets();
                    return {
                        ...t,
                        sheets: {
                            ...currentSheets,
                            [activeTab]: {
                                ...currentSheets[activeTab],
                                formData: {
                                    ...currentSheets[activeTab].formData,
                                    [field]: value,
                                },
                            },
                        },
                    };
                }
                return t;
            });
            saveStoredTopics(updated);
            return updated;
        });
    };

    // Handler to update row data for the active sheet in this topic
    const handleRowChange = (index, field, value) => {
        setTopics((prevTopics) => {
            const updated = prevTopics.map((t) => {
                if (t.id === currentTopic.id) {
                    const currentSheets = t.sheets || createBlankTopicSheets();
                    const isSheet3 = activeTab === 'Sheet 3';
                    const currentRows = [...normalizeSheetRows(currentSheets[activeTab]?.rows, isSheet3)];
                    currentRows[index] = {
                        ...currentRows[index],
                        [field]: value,
                    };
                    return {
                        ...t,
                        sheets: {
                            ...currentSheets,
                            [activeTab]: {
                                ...currentSheets[activeTab],
                                rows: currentRows,
                            },
                        },
                    };
                }
                return t;
            });
            saveStoredTopics(updated);
            return updated;
        });
    };

    // Handler to insert a new blank row immediately above the specified row index
    const handleAddRow = (index) => {
        setTopics((prevTopics) => {
            const updated = prevTopics.map((t) => {
                if (t.id === currentTopic.id) {
                    const currentSheets = t.sheets || createBlankTopicSheets();
                    const isSheet3 = activeTab === 'Sheet 3';
                    const currentRows = [...normalizeSheetRows(currentSheets[activeTab]?.rows, isSheet3)];
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
                        ...t,
                        sheets: {
                            ...currentSheets,
                            [activeTab]: {
                                ...currentSheets[activeTab],
                                rows: reindexed,
                            },
                        },
                    };
                }
                return t;
            });
            saveStoredTopics(updated);
            return updated;
        });
        showToast(`Inserted a new row above row ${index + 1}`);
    };

    // Handler to delete a specific row by index
    const handleDeleteRow = (index) => {
        setTopics((prevTopics) => {
            const updated = prevTopics.map((t) => {
                if (t.id === currentTopic.id) {
                    const currentSheets = t.sheets || createBlankTopicSheets();
                    const isSheet3 = activeTab === 'Sheet 3';
                    let currentRows = [...normalizeSheetRows(currentSheets[activeTab]?.rows, isSheet3)];
                    currentRows.splice(index, 1);

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
                        ...t,
                        sheets: {
                            ...currentSheets,
                            [activeTab]: {
                                ...currentSheets[activeTab],
                                rows: reindexed,
                            },
                        },
                    };
                }
                return t;
            });
            saveStoredTopics(updated);
            return updated;
        });
        showToast(`Deleted row ${index + 1}`);
    };

    // Save changes
    const handleSave = () => {
        saveStoredTopics(topics);
        showToast('Changes saved successfully!');
    };

    // Print
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-black">
            {/* Content Area */}
            <main className="min-h-screen w-full p-2.5 sm:p-5 md:p-6 bg-[#F8FAFC]">
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

                {/* Main Container Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3 sm:p-6 flex flex-col gap-4">
                    {/* TOP BAR: Back, Save, Print and Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 no-print">
                        {/* Left: ← Back, 💾 Save, 🖨️ Print */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            {/* ← Back Button */}
                            <button
                                type="button"
                                onClick={() => navigate('/', { state: { activeTab: requisitionType } })}
                                className="px-3 sm:px-3.5 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all text-xs sm:text-sm font-medium shadow-2xs flex items-center gap-1.5 cursor-pointer"
                                title="Back to Records"
                            >
                                <ArrowLeft className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                <span>Back</span>
                            </button>

                            {/* 💾 Save Button */}
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                                title="Save Changes"
                            >
                                <Save className="w-4 h-4 text-white flex-shrink-0" />
                                <span>Save</span>
                            </button>

                            {/* 🖨️ Print Button */}
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="px-3 sm:px-3.5 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all text-xs sm:text-sm font-medium shadow-2xs flex items-center gap-1.5 cursor-pointer"
                                title="Print Sheet"
                            >
                                <Printer className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                <span>Print</span>
                            </button>
                        </div>

                        {/* Right: 🔍 Search activities... | + Add Row | [ - | 100% | + ] */}
                        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap w-full lg:w-auto justify-between lg:justify-end">
                            {/* Search activities... */}
                            <div className="relative flex-1 sm:flex-initial min-w-[140px] sm:min-w-[240px]">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search activities..."
                                    className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800 transition-all placeholder:text-slate-400"
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

                            {/* Zoom Controls Pill: [ - | 100% | + ] */}
                            <div className="flex items-center rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs divide-x divide-slate-200/80 text-xs sm:text-sm flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={handleZoomOut}
                                    className="px-2.5 py-1.5 hover:bg-slate-50 text-slate-600 font-bold transition-colors cursor-pointer"
                                    title="Zoom Out (-10%)"
                                >
                                    −
                                </button>
                                <button
                                    type="button"
                                    onClick={handleResetZoom}
                                    className="px-2.5 py-1.5 font-semibold text-slate-700 bg-slate-50/40 hover:bg-slate-100 transition-colors cursor-pointer select-none min-w-[50px] sm:min-w-[52px] text-center"
                                    title="Reset Zoom to 100%"
                                >
                                    {zoom}%
                                </button>
                                <button
                                    type="button"
                                    onClick={handleZoomIn}
                                    className="px-2.5 py-1.5 hover:bg-slate-50 text-slate-600 font-bold transition-colors cursor-pointer"
                                    title="Zoom In (+10%)"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Requisition Name at top under top bar */}
                    <div className="pt-0.5 pb-1 no-print">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            {currentTopic.topic}
                        </h2>
                    </div>



                    {/* THE CHECKSHEET: Rendered with dynamic zoom scaling */}
                    <div className="w-full overflow-x-auto pb-4 pt-1 touch-pan-x">
                        <div
                            className="transition-transform duration-150 origin-top"
                            style={{
                                transform: zoom === 100 ? 'none' : `scale(${zoom / 100})`,
                                transformOrigin: 'top left',
                                width: zoom === 100 ? '100%' : `${(100 / zoom) * 100}%`,
                            }}
                        >
                            <div className="w-full min-w-[760px] bg-white border-2 border-black shadow-md select-text text-black print:shadow-none print:border-2 print:border-black print:w-full">
                                {activeTab === 'Sheet 3' ? (
                                    <QASheet3Table
                                        unit={currentTopic.unit}
                                        formData={currentSheet.formData}
                                        rows={currentSheet.rows}
                                        onFormChange={handleFormChange}
                                        onRowChange={handleRowChange}
                                        onAddRow={handleAddRow}
                                        onDeleteRow={handleDeleteRow}
                                        searchQuery={searchQuery}
                                    />
                                ) : (
                                    <QASheetTable
                                        sheetType={activeTab}
                                        unit={currentTopic.unit}
                                        formData={currentSheet.formData}
                                        rows={currentSheet.rows}
                                        onFormChange={handleFormChange}
                                        onRowChange={handleRowChange}
                                        onAddRow={handleAddRow}
                                        onDeleteRow={handleDeleteRow}
                                        searchQuery={searchQuery}
                                        hasCompanyHeader={activeTab === 'Sheet 2'}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
