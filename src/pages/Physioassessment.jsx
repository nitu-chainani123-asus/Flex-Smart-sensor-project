import { useState } from 'react'

function PhysioAssessment() {

  // SAMPLE ASSESSMENT INFORMATION

  const assessment = {
    assessmentId: 'SF-AS-001',
    patientId: 'SF-P001',
    patientName: 'Aarav Sharma',
    date: '31 October 2026',
    time: '10:30 AM',
    joint: 'Knee',
    deviceId: 'SF-DEVICE-001',
    status: 'Completed',
    duration: '02:35 Minutes',
  }


  // CURRENT SESSION MEASUREMENTS

  const currentSession = {
    minAngle: 10,
    maxAngle: 125,
    rangeOfMotion: 115,
    averageAngle: 72.5,
  }


  // PREVIOUS COMPATIBLE SESSION

  const previousSessions = [
    {
      id: 'SF-AS-000',
      date: '24 October 2026',
      joint: 'Knee',
      minAngle: 15,
      maxAngle: 110,
      rangeOfMotion: 95,
    },
    {
      id: 'SF-AS-OLD',
      date: '17 October 2026',
      joint: 'Knee',
      minAngle: 20,
      maxAngle: 105,
      rangeOfMotion: 85,
    },
  ]


  // SENSOR READINGS OF CURRENT SESSION

  const readings = [
    { time: '10:30:00', angle: 10 },
    { time: '10:30:10', angle: 25 },
    { time: '10:30:20', angle: 42 },
    { time: '10:30:30', angle: 58 },
    { time: '10:30:40', angle: 75 },
    { time: '10:30:50', angle: 90 },
    { time: '10:31:00', angle: 105 },
    { time: '10:31:10', angle: 125 },
    { time: '10:31:20', angle: 110 },
    { time: '10:31:30', angle: 85 },
  ]


  // AI RESULT

  const aiResult = {
    classification: 'Normal Range',
    modelVersion: 'Model v1.0',
    confidence: 92,
    limitations:
      'The model output depends on the quality of sensor readings, calibration and the data used during model training. Classification is not a medical diagnosis.',
  }


  // PROFESSIONAL OBSERVATION STATE

  const [observation, setObservation] = useState('')

  const [savedNotes, setSavedNotes] = useState([])

  const [selectedSession, setSelectedSession] = useState(
    previousSessions[0].id
  )

  const [message, setMessage] = useState('')


  // SELECTED PREVIOUS SESSION

  const comparisonSession = previousSessions.find(
    session => session.id === selectedSession
  )


  // CALCULATE DIFFERENCE

  const difference =
    currentSession.rangeOfMotion -
    comparisonSession.rangeOfMotion

  const percentageChange =
    comparisonSession.rangeOfMotion !== 0
      ? (
          difference /
          comparisonSession.rangeOfMotion
        ) * 100
      : 0


  // GRAPH DIMENSIONS

  const chartWidth = 700
  const chartHeight = 270

  const chartPoints = readings.map((reading, index) => {

    const x =
      45 + (index * 620) / (readings.length - 1)

    const y =
      220 - (reading.angle / 150) * 175

    return `${x},${y}`

  }).join(' ')


  // SAVE PROFESSIONAL OBSERVATION

  const saveObservation = () => {

    if (!observation.trim()) {

      setMessage('Please enter an observation first.')

      return

    }

    const newNote = {

      id: Date.now(),

      text: observation,

      date: new Date().toLocaleString(),

      author: 'Current Physiotherapist',

      assessmentId: assessment.assessmentId,

    }

    setSavedNotes(previous => [
      newNote,
      ...previous
    ])

    setObservation('')

    setMessage('Observation saved successfully for this session.')

  }


  return (

    <section>

      {/* PAGE HEADER */}

      <div className="mb-8">

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          PHYSIOTHERAPIST WORKSPACE
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Assessment Analysis
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-slate-500">
          Review patient assessment measurements, sensor readings,
          AI classification and professional observations.
        </p>

      </div>


      {/* DEMONSTRATION NOTICE */}

      <div className="mb-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">

        <p className="font-semibold text-amber-900">
          Demonstration Assessment
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          The patient information, sensor readings and AI results
          displayed here are sample data for frontend development.
          They are not actual patient measurements or clinical findings.
        </p>

      </div>


      {/* ASSESSMENT INFORMATION */}

      <article className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Assessment Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete assessment session details
            </p>

          </div>

          <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
            {assessment.status}
          </span>

        </div>


        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {[
            ['Assessment ID', assessment.assessmentId],
            ['Patient Name', assessment.patientName],
            ['Patient ID', assessment.patientId],
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

      </article>


      {/* MEASUREMENT CARDS */}

      <div className="mb-7">

        <div className="mb-5">

          <h2 className="text-lg font-bold text-slate-900">
            Measurement Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recorded joint movement measurements
          </p>

        </div>


        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


          {/* MINIMUM ANGLE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Minimum Angle
            </p>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {currentSession.minAngle}°
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Lowest recorded angle
            </p>

          </div>


          {/* MAXIMUM ANGLE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Maximum Angle
            </p>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {currentSession.maxAngle}°
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Highest recorded angle
            </p>

          </div>


          {/* RANGE OF MOTION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Range of Motion
            </p>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {currentSession.rangeOfMotion}°
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Maximum minus minimum angle
            </p>

          </div>


          {/* AVERAGE ANGLE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Average Angle
            </p>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {currentSession.averageAngle}°
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Average of sample readings
            </p>

          </div>

        </div>

      </div>


      {/* SENSOR GRAPH */}

      <article className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-6">

          <h2 className="text-lg font-bold text-slate-900">
            Time-Series Sensor Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Joint angle measurements recorded during the session
          </p>

        </div>


        <div className="w-full overflow-x-auto">

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full min-w-[500px]"
          >

            {/* GRAPH GRID */}

            {[0, 30, 60, 90, 120, 150].map(value => {

              const y =
                220 - (value / 150) * 175

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


            {/* GRAPH LINE */}

            <polyline
              points={chartPoints}
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />


            {/* GRAPH POINTS */}

            {readings.map((reading, index) => {

              const x =
                45 + (index * 620) / (readings.length - 1)

              const y =
                220 - (reading.angle / 150) * 175

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


            {/* TIME LABELS */}

            {readings.filter((_, index) => index % 2 === 0).map(reading => {

              const index = readings.indexOf(reading)

              const x =
                45 + (index * 620) / (readings.length - 1)

              return (

                <text
                  key={index}
                  x={x}
                  y="245"
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

          <span>X-axis: Time</span>

          <span>Y-axis: Angle (Degrees)</span>

        </div>

      </article>


      {/* SESSION COMPARISON */}

      <article className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <h2 className="text-lg font-bold text-slate-900">
          Previous Session Comparison
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare the current session with a compatible previous session.
        </p>


        <div className="mt-5">

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Select Previous Session
          </label>

          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 sm:max-w-md"
          >

            {previousSessions.map(session => (

              <option key={session.id} value={session.id}>
                {session.id} - {session.date}
              </option>

            ))}

          </select>

        </div>


        <div className="mt-6 grid gap-5 md:grid-cols-2">

          {/* CURRENT SESSION */}

          <div className="rounded-xl bg-blue-50 p-5">

            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Current Session
            </p>

            <h3 className="mt-2 text-lg font-bold text-blue-900">
              {assessment.assessmentId}
            </h3>

            <p className="mt-2 text-sm text-blue-800">
              {assessment.date}
            </p>

            <p className="mt-5 text-sm text-blue-800">
              Range of Motion
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-900">
              {currentSession.rangeOfMotion}°
            </p>

          </div>


          {/* PREVIOUS SESSION */}

          <div className="rounded-xl bg-slate-50 p-5">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Previous Session
            </p>

            <h3 className="mt-2 text-lg font-bold text-slate-900">
              {comparisonSession.id}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {comparisonSession.date}
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Range of Motion
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {comparisonSession.rangeOfMotion}°
            </p>

          </div>

        </div>


        {/* COMPARISON RESULT */}

        <div className="mt-5 rounded-xl border border-slate-200 p-5">

          <h3 className="font-bold text-slate-900">
            Measurement Difference
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <div>

              <p className="text-sm text-slate-500">
                Absolute Difference
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {difference > 0 ? '+' : ''}
                {difference}°
              </p>

            </div>


            <div>

              <p className="text-sm text-slate-500">
                Percentage Change
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {percentageChange > 0 ? '+' : ''}
                {percentageChange.toFixed(2)}%
              </p>

            </div>

          </div>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            Numerical differences alone do not establish clinical
            improvement or deterioration. Interpretation requires
            professional review and consideration of measurement
            conditions and assessment compatibility.
          </p>

        </div>

      </article>


      {/* AI ANALYSIS */}

      <article className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-5">

          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            AI-ASSISTED ANALYSIS
          </p>

          <h2 className="mt-2 text-lg font-bold text-slate-900">
            AI Classification Result
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Model-generated classification for professional review
          </p>

        </div>


        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

          <p className="text-sm font-medium text-blue-800">
            Classification
          </p>

          <h3 className="mt-3 text-2xl font-bold text-blue-900">
            {aiResult.classification}
          </h3>


          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>

              <p className="text-xs text-blue-700">
                Model Version
              </p>

              <p className="mt-2 font-bold text-blue-900">
                {aiResult.modelVersion}
              </p>

            </div>


            <div>

              <p className="text-xs text-blue-700">
                Confidence Score
              </p>

              <p className="mt-2 font-bold text-blue-900">
                {aiResult.confidence}%
              </p>

            </div>

          </div>

        </div>


        {/* AI LIMITATIONS */}

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">

          <h3 className="font-bold text-amber-900">
            AI Model Limitations
          </h3>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            {aiResult.limitations}
          </p>

        </div>


        <p className="mt-4 text-xs leading-6 text-slate-500">
          AI output represents a classification, not a medical diagnosis.
          Clinical interpretation remains the responsibility of the
          qualified physiotherapist.
        </p>

      </article>


      {/* PROFESSIONAL OBSERVATIONS */}

      <article className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <h2 className="text-lg font-bold text-slate-900">
          Professional Observations
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Record observations associated with this assessment session.
        </p>


        <div className="mt-5">

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Enter Observation
          </label>

          <textarea
            value={observation}
            onChange={(e) => {
              setObservation(e.target.value)
              setMessage('')
            }}
            rows="5"
            placeholder="Enter your professional observations here..."
            className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
          />

        </div>


        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <p className="text-xs text-slate-500">
            Assessment ID: {assessment.assessmentId}
          </p>

          <button
            onClick={saveObservation}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Save Observation
          </button>

        </div>


        {message && (

          <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
            {message}
          </p>

        )}

      </article>


      {/* EXISTING NOTES */}

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

        <h2 className="text-lg font-bold text-slate-900">
          Existing Professional Notes
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Observations saved during this demonstration session.
        </p>


        {savedNotes.length === 0 ? (

          <div className="mt-5 rounded-xl bg-slate-50 p-6 text-center">

            <p className="font-semibold text-slate-700">
              No observations saved yet
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Saved observations will appear here.
            </p>

          </div>

        ) : (

          <div className="mt-5 space-y-4">

            {savedNotes.map(note => (

              <div
                key={note.id}
                className="rounded-xl border border-slate-200 p-5"
              >

                <p className="text-sm leading-6 text-slate-700">
                  {note.text}
                </p>

                <div className="mt-4 flex flex-col justify-between gap-2 border-t border-slate-100 pt-3 sm:flex-row">

                  <p className="text-xs font-semibold text-slate-600">
                    {note.author}
                  </p>

                  <p className="text-xs text-slate-400">
                    {note.date}
                  </p>

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Assessment: {note.assessmentId}
                </p>

              </div>

            ))}

          </div>

        )}

      </article>


      {/* FINAL NOTICE */}

      <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">

        <h2 className="font-bold text-blue-900">
          Assessment Review Complete
        </h2>

        <p className="mt-2 text-sm leading-6 text-blue-800">
          Review the recorded measurements, AI classification
          and professional observations before finalising the
          assessment record.
        </p>

      </div>

    </section>

  )

}

export default PhysioAssessment