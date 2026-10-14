import React, { useState } from 'react';
import {
    Home,
    ChevronRight,
    Globe,
    Download,
    Settings,
    Bell,
    Check,
    Menu
} from 'lucide-react';

export default function Navbar({ collapsed, onExport, activeSheetTopic, onBackToPDCA, onBackToRequisition, onToggleMobileSidebar }) {
    const [langMenu, setLangMenu] = useState(false);
    const [currentLang, setCurrentLang] = useState('EN');
    const handleHomeClick = onBackToRequisition || onBackToPDCA;

    return (
        <header className="h-16 w-full min-w-0 bg-white border-b border-[#E9ECEF] flex items-center justify-between px-3 md:px-6 sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            {/* Left: Mobile menu toggle + Breadcrumbs */}
            <div className="flex items-center gap-1 sm:gap-2 text-sm min-w-0 mr-2">
                {onToggleMobileSidebar && (
                    <button
                        type="button"
                        onClick={onToggleMobileSidebar}
                        className="md:hidden text-slate-600 hover:text-slate-900 p-1.5 -ml-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0"
                        title="Toggle Navigation Menu"
                    >
                        <Menu className="w-5 h-5 text-slate-700" />
                    </button>
                )}
                <button
                    onClick={handleHomeClick}
                    className="text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0 p-1 rounded-md cursor-pointer"
                    title="Home"
                >
                    <Home className="w-4 h-4" />
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 stroke-[2.5] flex-shrink-0" />
                <button
                    onClick={handleHomeClick}
                    className={`font-semibold text-xs sm:text-[15px] tracking-tight transition-colors flex-shrink-0 truncate max-w-[160px] sm:max-w-none ${activeSheetTopic ? 'text-slate-500 hover:text-blue-600 cursor-pointer' : 'text-slate-800'
                        }`}
                >
                    REQUISITION
                </button>
            </div>

            {/* Right Utility Icons matching screenshot - desktop full icons, mobile responsive compact */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {/* Language selector */}
                <div className="relative">
                    <button
                        onClick={() => setLangMenu(!langMenu)}
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors text-xs font-semibold"
                        title="Select Language"
                    >
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-700">{currentLang}</span>
                    </button>

                    {langMenu && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs font-medium">
                            {['EN', 'HI', 'JA'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => {
                                        setCurrentLang(lang);
                                        setLangMenu(false);
                                    }}
                                    className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
                                >
                                    <span>{lang === 'EN' ? 'English (EN)' : lang === 'HI' ? 'Hindi (HI)' : 'Japanese (JA)'}</span>
                                    {currentLang === lang && <Check className="w-3.5 h-3.5 text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Download Icon - hidden on very small screens, visible from sm: */}
                <button
                    onClick={onExport}
                    className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    title="Download PDCA Report"
                >
                    <Download className="w-4 h-4" />
                </button>

                {/* Settings Icon - hidden on very small screens, visible on md: */}
                <button
                    className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden sm:block"
                    title="System Settings"
                >
                    <Settings className="w-4 h-4" />
                </button>

                {/* Notifications Icon with dot */}
                <button
                    className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
                    title="Notifications"
                >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* User Avatar Circle 'YY' in solid vibrant blue */}
                <div className="ml-1 sm:ml-2 pl-1.5 sm:pl-2 border-l border-slate-200 flex items-center gap-2">
                    <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-[11px] sm:text-xs shadow-sm ring-2 ring-blue-100 cursor-pointer flex-shrink-0"
                        title="Yogesh Yadav (AS081213)"
                    >
                        YY
                    </div>
                </div>
            </div>
        </header>
    );
}
