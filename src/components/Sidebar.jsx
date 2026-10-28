
function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: 'Dashboard Overview', icon: '⌂' },
    { name: 'Exercise Plan', icon: '✳' },
    { name: 'Help Centre', icon: '?' },
  ]

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#14233f] text-white md:min-h-screen md:w-64">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-2xl font-bold shadow-lg shadow-blue-500/20">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">SmartFlex</h1>
            <p className="mt-0.5 text-xs text-slate-400">Rehabilitation System</p>
          </div>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto p-3 md:flex-col md:gap-2 md:p-4">
        <p className="hidden px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 md:block">
          Workspace
        </p>

        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
              activePage === item.name
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-lg">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto hidden p-5 md:block">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-lg text-emerald-300">
            ♧
          </div>
          <p className="text-sm font-semibold">Better movement.</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Supporting your rehabilitation journey, one step at a time.
          </p>
        </div>
        <p className="mt-5 text-center text-[10px] text-slate-500">
          SMARTFLEX · PATIENT PORTAL
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
