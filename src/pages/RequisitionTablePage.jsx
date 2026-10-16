import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
    loadStoredTopics,
    saveStoredTopics,
    createBlankTopicSheets
} from '../data/topicStore';
import {
    Building2,
    Calendar,
    ChevronDown,
    FileSpreadsheet,
    Plus,
    Search,
    Check,
    CheckCircle2,
    Edit3,
    Trash2,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function RequisitionTablePage() {
    const navigate = useNavigate();

    // 1. Sidebar collapse state & mobile drawer state
    const [collapsed, setCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // 2. Unit Dropdown: options 'Bawal', 'Gujrat'. Default is 'Bawal'
    const [selectedUnit, setSelectedUnit] = useState('Bawal');
    const [unitDropdownOpen, setUnitDropdownOpen] = useState(false);

    // 3. Requisition Type Tabs: 'Event Test Requisition' & 'General Test Requisition'
    const REQUISITION_TABS = [
        { id: 'Event Test Requisition', label: 'Event Test Requisition' },
        { id: 'General Test Requisition', label: 'General Test Requisition' },
    ];
    const [activeTab, setActiveTab] = useState('Event Test Requisition');

    // 4. Search query
    const [searchQuery, setSearchQuery] = useState('');

    // 5. Topics list
    const [topics, setTopics] = useState(loadStoredTopics());

    useEffect(() => {
        saveStoredTopics(topics);
    }, [topics]);

    // 6. Toast notification
    const [toastMessage, setToastMessage] = useState('');
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    // 7. Add Requisition Modal state
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [newRequisitionType, setNewRequisitionType] = useState('Event Test Requisition');
    const [newTopicName, setNewTopicName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    const [newSection, setNewSection] = useState('');
    const [newCreatedBy, setNewCreatedBy] = useState('JOY DASTIDAR (ST08...)');
    const [newCreatedId, setNewCreatedId] = useState('ST080014');

    // 8. Date Selector / Filter state for Table Page
    const [selectedDateFilter, setSelectedDateFilter] = useState('');
    const dateInputRef = useRef(null);

    const handleOpenDatePicker = () => {
        if (dateInputRef.current) {
            if (typeof dateInputRef.current.showPicker === 'function') {
                try {
                    dateInputRef.current.showPicker();
                    return;
                } catch (err) {
                    console.warn('showPicker error, fallback to focus:', err);
                }
            }
            dateInputRef.current.focus();
        }
    };

    const formatDisplayDate = (isoDate) => {
        if (!isoDate) return '';
        try {
            const [year, month, day] = isoDate.split('-').map(Number);
            if (!year || !month || !day) return isoDate;
            const d = new Date(year, month - 1, day);
            return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch {
            return isoDate;
        }
    };

    // Filter topics based on selectedUnit, activeTab, selectedDateFilter, and searchQuery
    const filteredTopics = topics.filter((t) => {
        if (selectedUnit && t.unit !== selectedUnit) return false;
        const itemType = t.requisitionType || (
            t.topic === 'Testing' || t.topic === 'Testing 2' || t.topic?.toLowerCase().includes('general') || t.topic?.toLowerCase().includes('routine')
                ? 'General Test Requisition'
                : 'Event Test Requisition'
        );
        if (itemType !== activeTab) return false;

        // Date Filter
        if (selectedDateFilter) {
            const formattedFilter = formatDisplayDate(selectedDateFilter);
            if (t.date !== formattedFilter && t.date !== selectedDateFilter) {
                return false;
            }
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchTopic = t.topic.toLowerCase().includes(q);
            const matchDesc = t.description?.toLowerCase().includes(q);
            const matchId = t.id?.toLowerCase().includes(q);
            const matchUser = t.createdByName?.toLowerCase().includes(q) || t.createdById?.toLowerCase().includes(q);
            const matchEvent = t.eventTrigger?.toLowerCase().includes(q);
            const matchDept = t.department?.toLowerCase().includes(q);
            const matchSec = t.section?.toLowerCase().includes(q);
            return matchTopic || matchDesc || matchId || matchUser || matchEvent || matchDept || matchSec;
        }
        return true;
    });

    // Handle adding a new Requisition item
    const handleCreateTopic = (e) => {
        e.preventDefault();
        if (!newTopicName.trim()) {
            showToast('Please enter Requisition Details.');
            return;
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        // Generate uuid
        const generatedId = (typeof crypto !== 'undefined' && crypto.randomUUID)
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const newRecord = {
            id: generatedId,
            unit: selectedUnit || 'Bawal',
            category: 'Plant',
            requisitionType: newRequisitionType || activeTab,
            eventTrigger: (newRequisitionType || activeTab) === 'Event Test Requisition' ? 'New Development' : '',
            topic: newTopicName.trim(),
            description: newDescription.trim() || newTopicName.trim(),
            department: newDepartment.trim(),
            section: newSection.trim(),
            date: dateStr,
            time: timeStr,
            createdByName: newCreatedBy,
            createdById: newCreatedId,
            avatarText: newCreatedBy.slice(0, 2).toUpperCase() || 'JD',
            avatarBg: 'bg-blue-100 text-blue-700 border-blue-200',
            sheets: createBlankTopicSheets(),
        };

        // Populate department and date in sheets formData
        if (newRecord.sheets) {
            Object.keys(newRecord.sheets).forEach((k) => {
                if (newRecord.sheets[k]?.formData) {
                    if (newDepartment.trim()) {
                        newRecord.sheets[k].formData.deptt = newDepartment.trim();
                    }
                    if (dateStr) {
                        newRecord.sheets[k].formData.date = dateStr;
                    }
                }
            });
        }

        const updated = [newRecord, ...topics];
        setTopics(updated);
        saveStoredTopics(updated);
        setAddModalOpen(false);
        setNewTopicName('');
        setNewDescription('');
        setNewDepartment('');
        setNewSection('');

        showToast(`Created new ${newRecord.requisitionType}: "${newRecord.topic}"`);
    };

    // Clone topic
    const handleCloneTopic = (record) => {
        const generatedId = (typeof crypto !== 'undefined' && crypto.randomUUID)
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const cloned = {
            ...record,
            id: generatedId,
            topic: `${record.topic} (Copy)`,
            sheets: JSON.parse(JSON.stringify(record.sheets || createBlankTopicSheets())),
        };

        const updated = [cloned, ...topics];
        setTopics(updated);
        saveStoredTopics(updated);
        showToast(`Cloned record to "${cloned.topic}"`);
    };

    // Delete topic
    const handleDeleteTopic = (id, topicName) => {
        if (window.confirm(`Are you sure you want to delete "${topicName}"?`)) {
            const updated = topics.filter((t) => t.id !== id);
            setTopics(updated);
            saveStoredTopics(updated);
            showToast(`Deleted record "${topicName}"`);
        }
    };

    // Export Excel/CSV of table list
    const handleExportTableExcel = () => {
        let csv = `sep=,\n`;
        csv += `"${activeTab.toUpperCase()} RECORDS LIST - UNIT: ${(selectedUnit || 'ALL').toUpperCase()}"\n\n`;
        csv += `"S.NO","REQUISITION NAME","TYPE / TRIGGER","DESCRIPTION","DATE","TIME","CREATED BY","EMPLOYEE ID"\n`;

        filteredTopics.forEach((t, i) => {
            const trigger = t.eventTrigger || (t.requisitionType || activeTab);
            csv += `"${i + 1}","${t.topic.replace(/"/g, '""')}","${trigger.replace(/"/g, '""')}","${t.description.replace(/"/g, '""')}","${t.date}","${t.time}","${t.createdByName}","${t.createdById}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeTab.replace(/\s+/g, '_')}_Records_${selectedUnit || 'All'}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        showToast(`Exported ${activeTab} table to CSV successfully!`);
    };

    return (
        <div className="min-h-screen bg-[#F1F3F5] text-black">
            {/* Sidebar (fixed left on desktop, offcanvas drawer on mobile) */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileSidebarOpen}
                setMobileOpen={setMobileSidebarOpen}
            />

            {/* Main column */}
            <div
                className={`flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'
                    }`}
            >
                {/* Navbar */}
                <Navbar
                    collapsed={collapsed}
                    onExport={() => window.print()}
                    activeSheetTopic="REQUISITION"
                    onBackToPDCA={() => { }}
                    onBackToRequisition={() => { }}
                    onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
                />

                {/* Content Area with soft light-gray background */}
                <main className="flex-1 min-w-0 p-2.5 sm:p-5 md:p-6 bg-[#F8FAFC]">
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

                    {/* Main Container Card matching reference screenshot */}
                    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 sm:p-6 flex flex-col gap-4">

                        {/* 1. TOP CONTROL BAR: Unit Dropdown */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
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
                                        <strong className={selectedUnit ? 'text-slate-900 font-semibold' : 'text-slate-400 font-normal'}>
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
                                                                className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300'
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

                        {/* 2. REQUISITION TABS: Directly below Unit dropdown, matching reference style */}
                        <div className="flex items-center no-print">
                            <div className="bg-[#F8FAFC] sm:bg-slate-50/80 border border-slate-200/90 rounded-2xl p-1 inline-flex items-center gap-1 sm:gap-1.5 shadow-2xs">
                                {REQUISITION_TABS.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                showToast(`Showing: ${tab.label}`);
                                            }}
                                            className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${isActive
                                                    ? 'bg-white text-slate-900 font-bold border border-slate-200/90 shadow-xs'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent font-medium'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. SEARCH & ACTION BUTTON BAR */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                            {/* Search bar matching reference screenshot */}
                            <div className="relative flex-1 min-w-0 w-full sm:max-w-xl">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by requisition name, description, created by..."
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

                            {/* Action Buttons: Date Selector + Export Excel + Add Requisition */}
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                {/* Date Selector / Date Picker Button */}
                                <div className="relative flex-1 sm:flex-initial">
                                    <button
                                        type="button"
                                        onClick={handleOpenDatePicker}
                                        className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl border transition-all shadow-2xs cursor-pointer select-none text-xs sm:text-sm font-medium ${selectedDateFilter
                                                ? 'border-blue-300 bg-blue-50/70 text-blue-800'
                                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                                            }`}
                                        title="Filter Records by Date"
                                    >
                                        <Calendar className={`w-4 h-4 flex-shrink-0 ${selectedDateFilter ? 'text-blue-600' : 'text-slate-500'}`} />
                                        <span className="whitespace-nowrap">
                                            {selectedDateFilter ? formatDisplayDate(selectedDateFilter) : 'Date'}
                                        </span>
                                        {selectedDateFilter && (
                                            <span
                                                role="button"
                                                tabIndex={0}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedDateFilter('');
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.stopPropagation();
                                                        setSelectedDateFilter('');
                                                    }
                                                }}
                                                className="relative z-10 p-0.5 text-slate-400 hover:text-slate-600 hover:bg-blue-100 rounded-full cursor-pointer ml-0.5"
                                                title="Clear date filter"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </span>
                                        )}
                                    </button>
                                    <input
                                        ref={dateInputRef}
                                        id="table-date-filter"
                                        type="date"
                                        value={selectedDateFilter}
                                        onChange={(e) => setSelectedDateFilter(e.target.value)}
                                        className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleExportTableExcel}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition-all shadow-2xs cursor-pointer"
                                    title="Export Table List to CSV"
                                >
                                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span>Export Excel</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setNewRequisitionType(activeTab);
                                        setAddModalOpen(true);
                                    }}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-blue-500/25 cursor-pointer"
                                    title="Add New Requisition"
                                >
                                    <Plus className="w-4 h-4 stroke-[2.5] flex-shrink-0" />
                                    <span>Requisition</span>
                                </button>
                            </div>
                        </div>

                        {/* 4. CONDITIONAL CONTENT AREA: Empty state OR Table exactly matching the screenshot */}
                        {!selectedUnit ? (
                            /* Empty state when no unit is selected */
                            <div className="border border-slate-200/80 rounded-2xl bg-white/70 py-16 sm:py-20 px-6 flex flex-col items-center justify-center text-center shadow-2xs my-2">
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
                            /* TABLE: Matching the screenshot exactly */
                            <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white mt-1 shadow-2xs">

                                <div className="overflow-x-auto touch-pan-x">
                                    <table className="w-full text-left border-collapse min-w-[700px]">
                                        <thead>
                                            <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                <th className="py-3.5 px-4 text-center w-16">S.NO</th>
                                                <th className="py-3.5 px-4 min-w-[200px]">REQUISITION NAME</th>
                                                <th className="py-3.5 px-4 min-w-[200px]">DESCRIPTION</th>
                                                <th className="py-3.5 px-4 w-32">DATE</th>
                                                <th className="py-3.5 px-4 w-28">TIME</th>
                                                <th className="py-3.5 px-4 min-w-[200px]">CREATED BY</th>
                                                <th className="py-3.5 px-4 text-center w-36">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                                            {filteredTopics.length === 0 ? (
                                                <tr>
                                                    <td colSpan={7} className="py-12 text-center text-slate-400">
                                                        No {activeTab} items found for {selectedUnit || 'all units'}. Click "+ Requisition" to create one.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredTopics.map((item, index) => (
                                                    <tr
                                                        key={item.id}
                                                        className="hover:bg-blue-50/30 transition-colors group"
                                                    >
                                                        {/* S.NO Badge */}
                                                        <td className="py-3.5 px-4 text-center">
                                                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-xs flex items-center justify-center font-medium mx-auto">
                                                                {index + 1}
                                                            </div>
                                                        </td>

                                                        {/* Requisition Name with Clickable link & Event trigger badge */}
                                                        <td className="py-3.5 px-4">
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => navigate(`/topic/${item.id}`, { state: { requisitionType: item.requisitionType || activeTab } })}
                                                                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline text-left cursor-pointer transition-colors block text-sm"
                                                                    title="Open checksheets for this requisition"
                                                                >
                                                                    {item.topic}
                                                                </button>
                                                                {item.eventTrigger && (
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 w-fit">
                                                                        {item.eventTrigger}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* DESCRIPTION */}
                                                        <td className="py-3.5 px-4 text-slate-700">
                                                            {item.description || '-'}
                                                        </td>

                                                        {/* DATE */}
                                                        <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap font-normal">
                                                            {item.date}
                                                        </td>

                                                        {/* TIME Badge */}
                                                        <td className="py-3.5 px-4">
                                                            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60 whitespace-nowrap">
                                                                {item.time}
                                                            </span>
                                                        </td>

                                                        {/* CREATED BY */}
                                                        <td className="py-3.5 px-4">
                                                            <div className="flex items-center gap-2.5">
                                                                <div
                                                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border flex-shrink-0 ${item.avatarBg || 'bg-rose-100 text-rose-700 border-rose-200'}`}
                                                                >
                                                                    {item.avatarText || 'JD'}
                                                                </div>
                                                                <div className="flex flex-col min-w-0">
                                                                    <span className="text-xs font-semibold text-slate-800 truncate">
                                                                        {item.createdByName}
                                                                    </span>
                                                                    <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200/50 w-fit">
                                                                        {item.createdById}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* ACTIONS */}
                                                        <td className="py-3.5 px-4 text-center">
                                                            <div className="flex items-center justify-center gap-1 text-slate-400">
                                                                {/* Edit / Open Checksheets */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => navigate(`/topic/${item.id}`, { state: { requisitionType: item.requisitionType || activeTab } })}
                                                                    className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                                                    title="Edit / Open Checksheets"
                                                                >
                                                                    <Edit3 className="w-4 h-4" />
                                                                </button>

                                                                {/* Delete */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteTopic(item.id, item.topic)}
                                                                    className="p-1.5 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                                    title="Delete Record"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination matching screenshot */}
                                <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-white">
                                    <span className="text-center sm:text-left">
                                        Showing{' '}
                                        <strong className="text-slate-800">
                                            {filteredTopics.length > 0 ? 1 : 0}
                                        </strong>{' '}
                                        to{' '}
                                        <strong className="text-slate-800">
                                            {filteredTopics.length}
                                        </strong>{' '}
                                        of{' '}
                                        <strong className="text-slate-800">
                                            {filteredTopics.length}
                                        </strong>{' '}
                                        {activeTab} items
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            disabled
                                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-300 cursor-not-allowed"
                                        >
                                            <ChevronLeft className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            className="w-7 h-7 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center shadow-xs"
                                        >
                                            1
                                        </button>
                                        <button
                                            type="button"
                                            disabled
                                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-300 cursor-not-allowed"
                                        >
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* + Add Requisition Modal */}
            {addModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg max-h-[92vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900">
                                Add New Requisition
                            </h3>
                            <button
                                onClick={() => setAddModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTopic} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Requisition Details *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTopicName}
                                    onChange={(e) => setNewTopicName(e.target.value)}
                                    placeholder="Enter Requisition Details"
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        list="department-options"
                                        value={newDepartment}
                                        onChange={(e) => setNewDepartment(e.target.value)}
                                        placeholder="e.g. Quality Assurance / QA"
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    />
                                    <datalist id="department-options">
                                        <option value="Quality Assurance (QA)" />
                                        <option value="Quality Control (QC)" />
                                        <option value="Production" />
                                        <option value="Engineering" />
                                        <option value="R&D / New Development" />
                                        <option value="Maintenance" />
                                    </datalist>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                        Section
                                    </label>
                                    <input
                                        type="text"
                                        list="section-options"
                                        value={newSection}
                                        onChange={(e) => setNewSection(e.target.value)}
                                        placeholder="e.g. QA Testing Lab"
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    />
                                    <datalist id="section-options">
                                        <option value="QA Testing Lab" />
                                        <option value="Wire Harness Assembly" />
                                        <option value="Applicator & Tooling" />
                                        <option value="Component Inspection" />
                                        <option value="Pre-Production / Sampling" />
                                        <option value="In-Process QA" />
                                    </datalist>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    rows={3}
                                    placeholder="Enter description or testing objectives..."
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Requisition Type *
                                </label>
                                <select
                                    value={newRequisitionType}
                                    onChange={(e) => setNewRequisitionType(e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="Event Test Requisition">Event Test Requisition</option>
                                    <option value="General Test Requisition">General Test Requisition</option>
                                </select>
                            </div>



                            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setAddModalOpen(false)}
                                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-blue-500/25"
                                >
                                    Create Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
