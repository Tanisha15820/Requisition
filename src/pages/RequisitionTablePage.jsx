import React, { useState, useEffect } from 'react';
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
    const [newTopicName, setNewTopicName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCreatedBy, setNewCreatedBy] = useState('JOY DASTIDAR (ST08...)');
    const [newCreatedId, setNewCreatedId] = useState('ST080014');

    // Filter topics based on selectedUnit and searchQuery
    const filteredTopics = topics.filter((t) => {
        if (selectedUnit && t.unit !== selectedUnit) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchTopic = t.topic.toLowerCase().includes(q);
            const matchDesc = t.description.toLowerCase().includes(q);
            const matchId = t.id.toLowerCase().includes(q);
            const matchUser = t.createdByName.toLowerCase().includes(q) || t.createdById.toLowerCase().includes(q);
            return matchTopic || matchDesc || matchId || matchUser;
        }
        return true;
    });

    // Handle adding a new Requisition item
    const handleCreateTopic = (e) => {
        e.preventDefault();
        if (!newTopicName.trim()) {
            showToast('Please enter a Requisition Name.');
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
            topic: newTopicName.trim(),
            description: newDescription.trim() || newTopicName.trim(),
            date: dateStr,
            time: timeStr,
            createdByName: newCreatedBy,
            createdById: newCreatedId,
            avatarText: newCreatedBy.slice(0, 2).toUpperCase() || 'JD',
            avatarBg: 'bg-blue-100 text-blue-700 border-blue-200',
            sheets: createBlankTopicSheets(),
        };

        const updated = [newRecord, ...topics];
        setTopics(updated);
        saveStoredTopics(updated);
        setAddModalOpen(false);
        setNewTopicName('');
        setNewDescription('');

        showToast(`Created new Requisition record: "${newRecord.topic}"`);
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
        csv += `"REQUISITION RECORDS LIST - UNIT: ${(selectedUnit || 'ALL').toUpperCase()}"\n\n`;
        csv += `"S.NO","REQUISITION NAME","DESCRIPTION","DATE","TIME","CREATED BY","EMPLOYEE ID"\n`;

        filteredTopics.forEach((t, i) => {
            csv += `"${i + 1}","${t.topic.replace(/"/g, '""')}","${t.description.replace(/"/g, '""')}","${t.date}","${t.time}","${t.createdByName}","${t.createdById}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Requisition_Records_${selectedUnit || 'All'}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        showToast('Exported records table to CSV successfully!');
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

                            {/* Action Buttons: Export Excel + Add Requisition */}
                            <div className="flex items-center gap-2 w-full sm:w-auto">
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
                                    onClick={() => setAddModalOpen(true)}
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
                                                        No Requisition items found for {selectedUnit || 'all units'}. Click "+ Requisition" to create one.
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

                                                        {/* Requisition Name with Clickable link */}
                                                        <td className="py-3.5 px-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => navigate(`/topic/${item.id}`)}
                                                                className="font-bold text-blue-600 hover:text-blue-800 hover:underline text-left cursor-pointer transition-colors block text-sm"
                                                                title="Open checksheets for this requisition"
                                                            >
                                                                {item.topic}
                                                            </button>
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
                                                                    onClick={() => navigate(`/topic/${item.id}`)}
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

                                {/* Pagination matching screenshot: Showing 1 to 3 of 3 Requisition items */}
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
                                        Requisition items
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
                                    Requisition Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTopicName}
                                    onChange={(e) => setNewTopicName(e.target.value)}
                                    placeholder="Enter Requisition Name"
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
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
                                    Plant / Unit
                                </label>
                                <select
                                    value={selectedUnit || 'Bawal'}
                                    onChange={(e) => setSelectedUnit(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Bawal">Bawal</option>
                                    <option value="Gujrat">Gujrat</option>
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
