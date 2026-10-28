
function AdminDashboard() {
  const stats = [
    {
      title: 'Registered Patients',
      value: '24',
      note: 'Illustrative demo count',
      icon: '♙',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Physiotherapists',
      value: '4',
      note: 'Illustrative demo count',
      icon: '✚',
      color: 'bg-violet-50 text-violet-700',
    },
    {
      title: 'Connected Devices',
      value: 'Pending',
      note: 'Awaiting ESP32 integration',
      icon: '⌁',
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Sensor Records',
      value: 'Pending',
      note: 'Awaiting database integration',
      icon: '▤',
      color: 'bg-amber-50 text-amber-700',
    },
  ]

  const integrations = [
    ['Patient Interface', 'Frontend available', 'bg-emerald-100 text-emerald-700'],
    ['ESP32 and Flex Sensor', 'Integration pending', 'bg-amber-100 text-amber-700'],
    ['Cloud / Database', 'Integration pending', 'bg-amber-100 text-amber-700'],
    ['AI Assessment Module', 'Implementation pending', 'bg-slate-100 text-slate-600'],
  ]

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
        SYSTEM MANAGEMENT
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Admin Dashboard
      </h1>
      <p className="mt-3 mb-7 max-w-2xl leading-7 text-slate-500">
        Monitor the SmartFlex platform and review account, device, and
        integration status.
      </p>

      <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <p className="font-semibold text-blue-900">Demo dashboard</p>
        <p className="mt-1 text-sm leading-6 text-blue-800">
          Counts are illustrative only. Device connectivity and sensor
          records are pending hardware and database integration.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <p className="mt-3 text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-bold ${stat.color}`}>
                {stat.icon}
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500">{stat.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            System Integration Status
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Current frontend and integration progress.
          </p>

          <div className="mt-5 space-y-4">
            {integrations.map(([name, status, style]) => (
              <div
                key={name}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <span className="text-sm font-medium text-slate-700">
                  {name}
                </span>
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Recent System Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Example entries for a future activity log.
          </p>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Patient account management
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Registration activity will appear here after backend integration.
              </p>
              <span className="mt-2 inline-block rounded-full bg-slate-200 px-2.5 py-1 text-xs text-slate-600">
                Sample entry
              </span>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Device monitoring
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Sensor events will appear here after ESP32 integration.
              </p>
              <span className="mt-2 inline-block rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-700">
                Awaiting integration
              </span>
            </div>
          </div>
        </article>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        SmartFlex Admin · Demonstration interface · No live patient data
      </p>
    </section>
  )
}

export default AdminDashboard
