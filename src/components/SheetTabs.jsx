import { useLocation, useNavigate } from 'react-router-dom';

const TABS = [
    { label: 'Sheet 1', path: '/qasheet1' },
    { label: 'Sheet 2', path: '/qasheet2' },
    { label: 'Sheet 3', path: '/qasheet3' },
];

export default function SheetTabs() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="self-start mb-3 flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-xs no-print">
            {TABS.map((tab) => {
                const active = location.pathname === tab.path;
                return (
                    <button
                        key={tab.path}
                        type="button"
                        onClick={() => navigate(tab.path)}
                        aria-current={active ? 'page' : undefined}
                        className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                            active
                                ? 'bg-slate-200 text-slate-900'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
