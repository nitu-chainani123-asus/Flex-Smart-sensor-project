
import { useState } from 'react'

function MyPatients({ onViewDetails }) {
  const [search, setSearch] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)

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

  const filteredPatients = patients.filter((patient) => {
    const query = search.trim().toLowerCase()
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.patientId.toLowerCase().includes(query)
    )
  })

  if (selectedPatient) {
    return (
      <section>
        <button
          type="button"
          onClick={() => setSelectedPatient(null)}
          className="mb-6 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Back to My Patients
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          PHYSIOTHERAPIST WORKSPACE
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Patient Details
        </h1>

        <p className="mt-3 mb-7 max-w-2xl leading-7 text-slate-500">
          Review patient information and assessment progress.
        </p>

        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-amber-900">Demonstration profile</p>
          <p className="mt-1 text-sm leading-6 text-amber-800">
            This is sample information for frontend development only.
            It is not a real patient record or clinical assessment.
          </p>
        </div>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-700">
              {selectedPatient.name.charAt(0)}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedPatient.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Patient ID: {selectedPatient.patientId}
              </p>
            </div>

            <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              Assessment {selectedPatient.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Age</p>
              <p className="mt-1 font-semibold text-slate-800">Not available</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Joint</p>
              <p className="mt-1 font-semibold text-slate-800">
                {selectedPatient.joint}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Assessment Status</p>
              <p className="mt-1 font-semibold text-slate-800">
                {selectedPatient.status}
              </p>
            </div>
          </div>
        </article>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-slate-900">
            Assessment Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Measurements will appear after sensor integration.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {['Joint Angle', 'Range of Motion', 'AI Assessment'].map((title) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="mt-3 text-xl font-bold text-slate-900">Pending</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Awaiting assessment data
                </p>
              </article>
            ))}
          </div>
        </div>

        <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Progress Notes</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Progress notes will be available after patient records and
            physiotherapist functionality are connected to the backend.
          </p>
          <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            Backend integration pending
          </span>
        </article>
      </section>
    )
  }

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
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
          {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
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
                  onClick={() => {
                    setSelectedPatient(patient)
                    onViewDetails?.(patient)
                  }}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </article>
          )) : (
            <p className="p-5 text-sm text-slate-500">
              No patients found. Try a different name or patient ID.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default MyPatients
