
function PhysioSidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: 'Dashboard Overview', icon: '⌂' },
    { name: 'My Patients', icon: '♙' },
    { name: 'Patient Details', icon: '▤' },
  ]

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#14233f] text-white md:min-h-screen md:w-64">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-2xl font-bold">
            S
          </div>

          <div>
            <h1 className="text-xl font-bold">SmartFlex</h1>
            <p className="mt-1 text-xs text-slate-400">
              Physiotherapist Portal
            </p>
          </div>
        </div>
      </div>

      <nav className="flex gap-2 p-3 md:flex-col md:p-4">
        <p className="hidden px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 md:block">
          Physio Workspace
        </p>

        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
              activePage === item.name
                ? 'bg-blue-600 text-white'
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
        <p className="text-center text-[10px] text-slate-500">
          SMARTFLEX · PHYSIO PORTAL
        </p>
      </div>
    </aside>
  )
}

export default PhysioSidebar

