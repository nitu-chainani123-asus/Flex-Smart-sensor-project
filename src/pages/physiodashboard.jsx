import { useState } from 'react'

function PhysioDashboard() {

  const [selectedPeriod, setSelectedPeriod] = useState('This Week')

  const stats = [
    {
      title: 'Total Patients',
      value: '24',
      description: 'Currently assigned patients',
      icon: '♙',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Pending Assessments',
      value: '08',
      description: 'Require your attention',
      icon: '▤',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Sessions Completed',
      value: '16',
      description: 'Successfully completed',
      icon: '✓',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Reports Generated',
      value: '12',
      description: 'Patient progress reports',
      icon: '▥',
      color: 'bg-purple-50 text-purple-600',
    },
  ]

  const patients = [
    {
      id: 'SF-P001',
      name: 'Aarav Sharma',
      joint: 'Knee',
      date: '30 Oct 2026',
      status: 'Assessment Pending',
    },
    {
      id: 'SF-P002',
      name: 'Priya Verma',
      joint: 'Shoulder',
      date: '30 Oct 2026',
      status: 'In Progress',
    },
    {
      id: 'SF-P003',
      name: 'Rohan Patel',
      joint: 'Elbow',
      date: '31 Oct 2026',
      status: 'Completed',
    },
    {
      id: 'SF-P004',
      name: 'Ananya Singh',
      joint: 'Knee',
      date: '31 Oct 2026',
      status: 'Assessment Pending',
    },
  ]

  const sessions = [
    {
      time: '09:00 AM',
      patient: 'Aarav Sharma',
      type: 'Initial Assessment',
      status: 'Upcoming',
    },
    {
      time: '10:30 AM',
      patient: 'Priya Verma',
      type: 'Follow-up Session',
      status: 'Upcoming',
    },
    {
      time: '12:00 PM',
      patient: 'Rohan Patel',
      type: 'Progress Review',
      status: 'Upcoming',
    },
  ]

  const getStatusStyle = (status) => {
    if (status === 'Completed') {
      return 'bg-emerald-50 text-emerald-700'
    }

    if (status === 'In Progress') {
      return 'bg-blue-50 text-blue-700'
    }

    return 'bg-amber-50 text-amber-700'
  }

  return (

    <section>

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            PHYSIOTHERAPIST WORKSPACE
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Dashboard Overview
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Welcome back! Here's an overview of your patients,
            assessments and therapy sessions.
          </p>

        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

          <p className="text-xs font-medium text-slate-500">
            Today's Date
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            31 October 2026
          </p>

        </div>

      </div>


      {/* DEMO DATA NOTICE */}

      <div className="mb-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">

        <p className="font-semibold text-amber-900">
          Demo Data
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          The patient records and statistics displayed here are
          sample data for frontend demonstration. Actual records
          will be connected through the backend.
        </p>

      </div>


      {/* STATISTICS CARDS */}

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${stat.color}`}>
                {stat.icon}
              </div>

            </div>

            <h2 className="mt-5 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              {stat.description}
            </p>

          </div>

        ))}

      </div>


      {/* PATIENT AND SESSION SECTION */}

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">


        {/* RECENT PATIENTS */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Recent Patients
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Overview of recently assigned patients
              </p>

            </div>

            <span className="w-fit rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
              {patients.length} Patients
            </span>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">

                <tr>

                  <th className="px-5 py-4 font-semibold">
                    Patient
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Joint
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Date
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {patients.map((patient) => (

                  <tr
                    key={patient.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                          {patient.name.charAt(0)}
                        </div>

                        <div>

                          <p className="font-semibold text-slate-800">
                            {patient.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {patient.id}
                          </p>

                        </div>

                      </div>

                    </td>


                    <td className="px-5 py-4 text-slate-600">
                      {patient.joint}
                    </td>


                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {patient.date}
                    </td>


                    <td className="px-5 py-4">

                      <span className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(patient.status)}`}>
                        {patient.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* UPCOMING SESSIONS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-6">

            <h2 className="text-lg font-bold text-slate-900">
              Upcoming Sessions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your scheduled appointments
            </p>

          </div>


          <div className="space-y-5">

            {sessions.map((session, index) => (

              <div
                key={index}
                className="flex gap-3 border-b border-slate-100 pb-5 last:border-0 last:pb-0"
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-bold text-slate-800">
                    {session.patient}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {session.type}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-blue-600">
                    {session.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* BOTTOM SECTION */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


        {/* ASSESSMENT SUMMARY */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-slate-900">
            Assessment Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current assessment workload
          </p>


          <div className="mt-6 space-y-5">

            <div>

              <div className="mb-2 flex justify-between text-sm">

                <span className="font-medium text-slate-600">
                  Completed Assessments
                </span>

                <span className="font-bold text-emerald-600">
                  16
                </span>

              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

                <div className="h-full w-[65%] rounded-full bg-emerald-500"></div>

              </div>

            </div>


            <div>

              <div className="mb-2 flex justify-between text-sm">

                <span className="font-medium text-slate-600">
                  In Progress
                </span>

                <span className="font-bold text-blue-600">
                  08
                </span>

              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

                <div className="h-full w-[35%] rounded-full bg-blue-500"></div>

              </div>

            </div>

          </div>

        </div>


        {/* QUICK INFORMATION */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-slate-900">
            Quick Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Important updates for your workspace
          </p>


          <div className="mt-6 space-y-4">

            <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">

              <span className="text-xl text-blue-600">
                ℹ
              </span>

              <div>

                <p className="text-sm font-semibold text-blue-900">
                  Assessment Reminder
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  You have 8 assessments waiting for completion.
                </p>

              </div>

            </div>


            <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4">

              <span className="text-xl text-emerald-600">
                ✓
              </span>

              <div>

                <p className="text-sm font-semibold text-emerald-900">
                  Progress Update
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  16 patient sessions have been marked as completed.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )
}

export default PhysioDashboard