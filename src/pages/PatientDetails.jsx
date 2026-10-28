
function PatientDetails() {
  const patient = {
    name: 'Aarav Sharma',
    patientId: 'SF-P001',
    age: 'Not available',
    joint: 'Not assigned',
    assessmentStatus: 'Pending',
  }

  const assessmentItems = [
    {
      title: 'Joint Angle',
      value: 'Pending',
      description: 'Awaiting sensor data',
    },
    {
      title: 'Range of Motion',
      value: 'Pending',
      description: 'Awaiting measurement',
    },
    {
      title: 'AI Assessment',
      value: 'Pending',
      description: 'AI module not integrated',
    },
  ]

  return (
    <section>
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
            {patient.name.charAt(0)}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">
              {patient.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Patient ID: {patient.patientId}
            </p>
          </div>

          <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
            Assessment {patient.assessmentStatus}
          </span>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Age</p>
            <p className="mt-1 font-semibold text-slate-800">{patient.age}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Joint</p>
            <p className="mt-1 font-semibold text-slate-800">{patient.joint}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Assessment Status</p>
            <p className="mt-1 font-semibold text-slate-800">
              {patient.assessmentStatus}
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
          {assessmentItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {item.title}
              </p>
              <p className="mt-3 text-xl font-bold text-slate-900">
                {item.value}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Progress Notes
        </h2>
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

export default PatientDetails
