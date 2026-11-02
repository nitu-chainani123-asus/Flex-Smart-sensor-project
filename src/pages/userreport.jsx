function UserReport() {

  // SAMPLE REPORT DATA

  const report = {
    reportId: 'SF-REP-001',

    patientId: 'SF-P001',
    patientName: 'Aarav Sharma',

    assessmentId: 'SF-AS-001',

    assessmentDate: '31 October 2026',
    assessmentTime: '10:30 AM',

    joint: 'Knee',

    deviceId: 'SF-DEVICE-001',

    status: 'Completed',

    minAngle: 10,
    maxAngle: 125,
    rangeOfMotion: 115,

    duration: '02:35 Minutes',

    aiClassification: 'Normal Range',

    modelVersion: 'Model v1.0',

    confidence: 92,

    generatedDate: '31 October 2026',
  }


  // SAMPLE GRAPH DATA

  const readings = [
    10, 25, 42, 58, 75, 90, 105, 125, 110, 85
  ]


  // SVG GRAPH

  const points = readings.map((value, index) => {

    const x = 45 + index * 68

    const y = 220 - (value / 150) * 175

    return `${x},${y}`

  }).join(' ')


  // DOWNLOAD REPORT

  const downloadReport = () => {

    window.print()

  }


  return (

    <section className="print:bg-white">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            PATIENT WORKSPACE
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Assessment Report
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Review your assessment summary, measurements
            and available AI classification.
          </p>

        </div>


        <button
          onClick={downloadReport}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 print:hidden"
        >
          ↓ Download / Print Report
        </button>

      </div>


      {/* DEMO NOTICE */}

      <div className="mb-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 print:hidden">

        <p className="font-semibold text-amber-900">
          Demonstration Report
        </p>

        <p className="mt-1 text-sm text-amber-800">
          This report contains illustrative sample data.
          It is not an actual clinical report.
        </p>

      </div>


      {/* REPORT DOCUMENT */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">


        {/* REPORT TITLE */}

        <div className="border-b border-slate-200 pb-6">

          <div className="flex flex-col justify-between gap-4 sm:flex-row">

            <div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                SMARTFLEX
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                IoT-Based Wearable Joint Flexibility Assessment System
              </p>

            </div>


            <div className="sm:text-right">

              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Assessment Report
              </p>

              <p className="mt-2 text-sm font-bold text-slate-800">
                {report.reportId}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Generated: {report.generatedDate}
              </p>

            </div>

          </div>

        </div>


        {/* PATIENT INFORMATION */}

        <div className="mt-7">

          <h3 className="text-lg font-bold text-slate-900">
            Patient Information
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            {[
              ['Patient Name', report.patientName],
              ['Patient ID', report.patientId],
              ['Assessment ID', report.assessmentId],
              ['Joint Type', report.joint],
              ['Assessment Date', report.assessmentDate],
              ['Assessment Time', report.assessmentTime],
              ['Device ID', report.deviceId],
              ['Session Status', report.status],
            ].map(([label, value]) => (

              <div
                key={label}
                className="rounded-xl bg-slate-50 p-4"
              >

                <p className="text-xs font-medium text-slate-500">
                  {label}
                </p>

                <p className="mt-2 text-sm font-bold text-slate-800">
                  {value}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* MEASUREMENT SUMMARY */}

        <div className="mt-8">

          <h3 className="text-lg font-bold text-slate-900">
            Measurement Summary
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Recorded joint movement measurements
          </p>


          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-slate-200 p-5">

              <p className="text-sm text-slate-500">
                Minimum Angle
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {report.minAngle}°
              </p>

            </div>


            <div className="rounded-xl border border-slate-200 p-5">

              <p className="text-sm text-slate-500">
                Maximum Angle
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {report.maxAngle}°
              </p>

            </div>


            <div className="rounded-xl border border-slate-200 p-5">

              <p className="text-sm text-slate-500">
                Range of Motion
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {report.rangeOfMotion}°
              </p>

            </div>

          </div>


          <div className="mt-4 rounded-xl bg-slate-50 p-4">

            <p className="text-xs font-medium text-slate-500">
              Session Duration
            </p>

            <p className="mt-2 font-bold text-slate-800">
              {report.duration}
            </p>

          </div>

        </div>


        {/* GRAPH */}

        <div className="mt-8">

          <h3 className="text-lg font-bold text-slate-900">
            Sensor Measurement Graph
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Recorded angle measurements during the session
          </p>


          <div className="mt-5 w-full overflow-x-auto">

            <svg
              viewBox="0 0 700 250"
              className="w-full min-w-[450px]"
            >

              {[0, 30, 60, 90, 120, 150].map(value => {

                const y = 220 - (value / 150) * 175

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
                      textAnchor="end"
                      fontSize="11"
                      fill="#64748b"
                    >
                      {value}°
                    </text>

                  </g>

                )

              })}


              <polyline
                points={points}
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              {readings.map((value, index) => (

                <circle
                  key={index}
                  cx={45 + index * 68}
                  cy={220 - (value / 150) * 175}
                  r="4"
                  fill="#2563eb"
                />

              ))}


              <text
                x="350"
                y="245"
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
              >
                Recorded Measurement Sequence
              </text>

            </svg>

          </div>


          <p className="mt-3 text-xs text-slate-500">
            Y-axis represents the recorded angle in degrees.
            Displayed readings are sample data.
          </p>

        </div>


        {/* AI RESULTS */}

        <div className="mt-8">

          <h3 className="text-lg font-bold text-slate-900">
            AI Assessment Classification
          </h3>

          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-5">

            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              Classification Result
            </p>

            <h4 className="mt-3 text-2xl font-bold text-blue-900">
              {report.aiClassification}
            </h4>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div>

                <p className="text-xs text-blue-700">
                  Model Version
                </p>

                <p className="mt-1 font-semibold text-blue-900">
                  {report.modelVersion}
                </p>

              </div>


              <div>

                <p className="text-xs text-blue-700">
                  Confidence Score
                </p>

                <p className="mt-1 font-semibold text-blue-900">
                  {report.confidence}%
                </p>

              </div>

            </div>

          </div>


          <p className="mt-3 text-xs leading-6 text-slate-500">
            AI output is an assessment classification and not
            a medical diagnosis. Interpretation should be
            performed by a qualified physiotherapist.
          </p>

        </div>


        {/* RECOMMENDATIONS */}

        <div className="mt-8">

          <h3 className="text-lg font-bold text-slate-900">
            Recommendations
          </h3>

          <div className="mt-4 rounded-xl border border-slate-200 p-5">

            <p className="font-semibold text-slate-800">
              Assessment-Related Recommendations
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Please refer to recommendations that have been
              reviewed and approved by your physiotherapist.
            </p>

            <p className="mt-3 text-xs font-semibold text-amber-700">
              Professional review required
            </p>

          </div>

        </div>


        {/* REPORT FOOTER */}

        <div className="mt-10 border-t border-slate-200 pt-6">

          <p className="text-sm font-semibold text-slate-800">
            SmartFlex Assessment System
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            This report presents recorded assessment information
            and available model-generated classification.
            It should not be interpreted as a medical diagnosis.
          </p>

          <p className="mt-5 text-center text-xs text-slate-400">
            End of Assessment Report
          </p>

        </div>

      </div>


      {/* DOWNLOAD BUTTON */}

      <div className="mt-6 flex justify-end print:hidden">

        <button
          onClick={downloadReport}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Download Report as PDF
        </button>

      </div>

    </section>

  )

}

export default UserReport