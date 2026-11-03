import { useState } from 'react'
import { demoAssessment as assessment, demoReadings as readings } from './demoAssessment'

function UserAssessment({ onOpenReport }) {
  // SAMPLE RECOMMENDATIONS

  const recommendations = [
    {
      name: 'Knee Mobility Exercise',
      description:
        'A reviewed mobility exercise targeting knee movement.',
      reason: 'Associated with the selected knee assessment.',
      precaution:
        'Follow only the instructions approved by your physiotherapist.',
      status: 'Pending Professional Review',
    },
    {
      name: 'Gentle Movement Practice',
      description:
        'A general movement activity for the selected joint.',
      reason: 'Linked to the current assessment.',
      precaution:
        'Stop and consult your physiotherapist if you experience discomfort.',
      status: 'Pending Professional Review',
    },
  ]


  // CHART DIMENSIONS

  const chartWidth = 700
  const chartHeight = 250

  const chartPoints = readings.map((reading, index) => {

    const x = 45 + (index * 620) / (readings.length - 1)

    const y = chartHeight - 35 -
      (reading.angle / 150) * 180

    return `${x},${y}`

  }).join(' ')


  const [showAllReadings, setShowAllReadings] = useState(false)


  return (

    <section>

      {/* PAGE HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            PATIENT WORKSPACE
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Assessment Details
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            View your assessment measurements, sensor readings
            and available analysis.
          </p>

        </div>


        <button
          onClick={() => onOpenReport?.()}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          View Assessment Report →
        </button>

      </div>


      {/* DEMO NOTICE */}

      <div className="mb-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">

        <p className="font-semibold text-amber-900">
          Demonstration Assessment
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          All readings, measurements, and AI classifications displayed
          on this page are sample data for frontend development.
          They are not actual clinical results or a diagnosis.
        </p>

      </div>


      {/* ASSESSMENT INFORMATION */}

      <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Assessment Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete session details
            </p>

          </div>

          <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
            {assessment.status}
          </span>

        </div>


        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {[
            ['Assessment ID', assessment.id],
            ['Patient ID', assessment.patientId],
            ['Patient Name', assessment.patientName],
            ['Assessment Date', assessment.date],
            ['Assessment Time', assessment.time],
            ['Joint Type', assessment.joint],
            ['Device ID', assessment.deviceId],
            ['Session Duration', assessment.duration],
          ].map(([label, value]) => (

            <div
              key={label}
              className="rounded-xl bg-slate-50 p-4"
            >

              <p className="text-xs font-medium text-slate-500">
                {label}
              </p>

              <p className="mt-2 break-words text-sm font-bold text-slate-800">
                {value}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* MEASUREMENT SUMMARY */}

      <div className="mb-7">

        <div className="mb-5">

          <h2 className="text-lg font-bold text-slate-900">
            Measurement Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recorded movement measurements in degrees
          </p>

        </div>


        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">


          {/* MINIMUM ANGLE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium text-slate-500">
                Minimum Angle
              </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
                ↘
              </span>

            </div>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {assessment.minAngle}°
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Lowest recorded angle
            </p>

          </div>


          {/* MAXIMUM ANGLE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium text-slate-500">
                Maximum Angle
              </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600">
                ↗
              </span>

            </div>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {assessment.maxAngle}°
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Highest recorded angle
            </p>

          </div>


          {/* RANGE OF MOTION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium text-slate-500">
                Range of Motion
              </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
                ↔
              </span>

            </div>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {assessment.rangeOfMotion}°
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Maximum angle minus minimum angle
            </p>

          </div>

        </div>

      </div>


      {/* SENSOR GRAPH */}

      <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-6">

          <h2 className="text-lg font-bold text-slate-900">
            Sensor Reading Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Angle measurements recorded during the assessment
          </p>

        </div>


        {/* GRAPH */}

        <div className="w-full overflow-x-auto">

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full min-w-[500px]"
          >

            {/* GRID LINES */}

            {[0, 30, 60, 90, 120, 150].map(value => {

              const y = chartHeight - 35 - (value / 150) * 180

              return (

                <g key={value}>

                  <line
                    x1="45"
                    y1={y}
                    x2="665"
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="5 5"
                  />

                  <text
                    x="30"
                    y={y + 4}
                    fontSize="11"
                    textAnchor="end"
                    fill="#64748b"
                  >
                    {value}°
                  </text>

                </g>

              )

            })}


            {/* X AXIS */}

            <line
              x1="45"
              y1="215"
              x2="665"
              y2="215"
              stroke="#cbd5e1"
            />


            {/* GRAPH LINE */}

            <polyline
              points={chartPoints}
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />


            {/* DATA POINTS */}

            {readings.map((reading, index) => {

              const x = 45 + (index * 620) / (readings.length - 1)

              const y = chartHeight - 35 -
                (reading.angle / 150) * 180

              return (

                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#2563eb"
                />

              )

            })}


            {/* X AXIS LABELS */}

            {readings.filter((_, index) => index % 2 === 0).map(reading => {

              const index = readings.indexOf(reading)

              const x = 45 + (index * 620) / (readings.length - 1)

              return (

                <text
                  key={index}
                  x={x}
                  y="235"
                  fontSize="10"
                  textAnchor="middle"
                  fill="#64748b"
                >
                  {reading.time.slice(-5)}
                </text>

              )

            })}

          </svg>

        </div>


        <div className="mt-4 flex flex-wrap gap-5 text-xs text-slate-500">

          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
            Recorded Angle
          </span>

          <span>
            X-axis: Time
          </span>

          <span>
            Y-axis: Angle (Degrees)
          </span>

        </div>

      </div>


      {/* SENSOR READINGS TABLE */}

      <div className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5">

          <h2 className="text-lg font-bold text-slate-900">
            Recorded Sensor Readings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Timestamp-wise measurement details
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">

              <tr>

                <th className="px-5 py-4">Reading No.</th>

                <th className="px-5 py-4">Timestamp</th>

                <th className="px-5 py-4">Angle</th>

                <th className="px-5 py-4">Unit</th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {(showAllReadings ? readings : readings.slice(0, 5)).map(
                (reading, index) => (

                  <tr key={index} className="hover:bg-slate-50">

                    <td className="px-5 py-4 text-slate-600">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {reading.time}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {reading.angle}°
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      Degrees
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        <div className="border-t border-slate-100 p-4 text-center">

          <button
            onClick={() => setShowAllReadings(!showAllReadings)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            {showAllReadings ? 'Show Less' : 'View All Readings'}
          </button>

        </div>

      </div>


      {/* AI ANALYSIS */}

      <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-5">

          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            AI-ASSISTED ANALYSIS
          </p>

          <h2 className="mt-2 text-lg font-bold text-slate-900">
            Assessment Classification
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            No live AI assessment is connected; the displayed result is illustrative.
          </p>

        </div>


        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

          <p className="text-sm font-semibold text-amber-800">
            Sample AI classification — not a clinical result
          </p>

          <h3 className="mt-3 text-2xl font-bold text-blue-900">
            {assessment.aiClassification}
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div>

              <p className="text-xs text-blue-700">
                Model Version
              </p>

              <p className="mt-1 font-semibold text-blue-900">
                {assessment.modelVersion}
              </p>

            </div>

            <div>

              <p className="text-xs text-blue-700">
                Confidence Score
              </p>

              <p className="mt-1 font-semibold text-blue-900">
                {assessment.confidence}%
              </p>

            </div>

          </div>

        </div>


        <p className="mt-4 text-xs leading-6 text-slate-500">
          AI classification is provided for assessment support
          only. It is not a medical diagnosis and should be
          interpreted by a qualified physiotherapist.
        </p>

      </div>


      {/* RECOMMENDATIONS */}

      <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <h2 className="text-lg font-bold text-slate-900">
          Exercise Recommendations
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Assessment-related recommendations and review status
        </p>


        <div className="mt-5 grid gap-4 md:grid-cols-2">

          {recommendations.map((item, index) => (

            <div
              key={index}
              className="rounded-xl border border-slate-200 p-5"
            >

              <div className="flex items-start justify-between gap-3">

                <h3 className="font-bold text-slate-800">
                  {item.name}
                </h3>

                <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">
                  {item.status}
                </span>

              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              <p className="mt-3 text-xs leading-5 text-slate-600">
                <strong>Reason:</strong> {item.reason}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                <strong>Precaution:</strong> {item.precaution}
              </p>

            </div>

          ))}

        </div>

        <p className="mt-5 text-xs leading-6 text-slate-500">
          Exercise instructions and precautions must be reviewed
          by a qualified physiotherapist before being provided
          as approved recommendations.
        </p>

      </div>


      {/* REPORT BUTTON */}

      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center">

        <div>

          <h2 className="font-bold text-blue-900">
            Assessment Report Available
          </h2>

          <p className="mt-1 text-sm text-blue-700">
            View your assessment summary and report.
          </p>

        </div>

        <button
          onClick={() => onOpenReport?.()}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Open Report →
        </button>

      </div>

    </section>

  )

}

export default UserAssessment