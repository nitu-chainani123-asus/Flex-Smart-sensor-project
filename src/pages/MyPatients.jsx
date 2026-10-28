
function MyPatients() {
  const patients = [
    {
      id: 1,
      name: 'Aarav Sharma',
      patientId: 'SF-P001',
      joint: 'Not assigned',
      status: 'Awaiting assessment',
    },
    {
      id: 2,
      name: 'Priya Verma',
      patientId: 'SF-P002',
      joint: 'Not assigned',
      status: 'Awaiting assessment',
    },
    {
      id: 3,
      name: 'Rohan Patel',
      patientId: 'SF-P003',
      joint: 'Not assigned',
      status: 'Awaiting assessment',
    },
  ]

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
        PHYSIOTHERAPIST WORKSPACE
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        My Patients
      </h1>

      <p className="mt-3 mb-7 max-w-2xl leading-7 text-slate-500">
        View assigned patients and check their assessment status.
      </p>

      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="font-semibold text-amber-900">Demo data</p>
        <p className="mt-1 text-sm leading-6 text-amber-800">
          These sample entries are for frontend demonstration only.
          Actual patient records will be connected through the backend.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label
          htmlFor="patient-search"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Search patients
        </label>
        <input
          id="patient-search"
          type="text"
          placeholder="Search by patient name or ID"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold text-slate-900">
            Patient List
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sample records for layout demonstration
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {patients.map((patient) => (
            <article
              key={patient.id}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-700">
                  {patient.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {patient.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Patient ID: {patient.patientId}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Joint: {patient.joint}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 sm:items-end">
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  {patient.status}
                </span>

                <button
                  type="button"
                  disabled
                  title="Patient details navigation will be connected later"
                  className="cursor-not-allowed rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MyPatients
