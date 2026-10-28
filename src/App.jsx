
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import AdminSidebar from './components/AdminSidebar'
import AdminDashboard from './pages/AdminDashboard'
const exercises = [
  { name: 'Knee Flexion', detail: '3 sets × 15 reps', status: 'Completed', icon: '✓' },
  { name: 'Quadriceps Stretch', detail: '3 sets × 20 seconds', status: 'Completed', icon: '✓' },
  { name: 'Straight Leg Raise', detail: '3 sets × 10 reps', status: 'In Progress', icon: '↻' },
  { name: 'Heel Slide', detail: '3 sets × 15 reps', status: 'Pending', icon: '○' },
  { name: 'Ankle Pumps', detail: '3 sets × 20 reps', status: 'Pending', icon: '○' },
]

function App() {
  const [activePage, setActivePage] = useState('Dashboard Overview')
  const [activeRole, setActiveRole] = useState('Patient')
  const [completed, setCompleted] = useState([true, true, false, false, false])

  const completedCount = completed.filter(Boolean).length
  const completion = Math.round((completedCount / exercises.length) * 100)

  const toggleExercise = (index) => {
    setCompleted((previous) =>
      previous.map((value, i) => (i === index ? !value : value))
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 md:flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-200/80 bg-white px-5 py-4 md:px-9">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              SmartFlex / Patient
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Rehabilitation made more manageable
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">Patient Portal</p>
              <p className="text-xs text-slate-500">Personal dashboard</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              P
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-5 md:p-9">
          {activePage === 'Dashboard Overview' && (
            <>
              <section className="mb-8 grid items-center gap-6 xl:grid-cols-[1fr_340px]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    YOUR REHABILITATION SPACE
                  </span>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    Welcome back!
                  </h1>
                  <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                    Every small step matters. Review your exercise plan,
                    track your daily activity, and keep moving forward at
                    a pace recommended by your physiotherapist.
                  </p>
                  <button
                    onClick={() => setActivePage('Exercise Plan')}
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    View my exercise plan <span className="ml-2">→</span>
                  </button>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-6 text-white shadow-xl shadow-blue-900/10">
                  <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[24px] border-white/10" />
                  <div className="absolute -bottom-14 right-12 h-36 w-36 rounded-full bg-cyan-300/20 blur-2xl" />
                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                      ✦
                    </div>
                    <p className="text-sm font-medium text-blue-100">YOUR DAILY REMINDER</p>
                    <h2 className="mt-2 text-2xl font-bold leading-snug">
                      Progress starts<br />with consistency.
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-blue-100">
                      Follow your prescribed plan and take one step at a time.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  icon="▤"
                  label="My Exercise Plan"
                  value="View plan"
                  note="Review your exercises"
                  tone="blue"
                  onClick={() => setActivePage('Exercise Plan')}
                />
                <StatCard
                  icon="✓"
                  label="Exercises Completed"
                  value={`${completedCount} of ${exercises.length}`}
                  note="Based on this demo checklist"
                  tone="green"
                />
                <StatCard
                  icon="◷"
                  label="Plan Completion"
                  value={`${completion}%`}
                  note="Updates when you mark exercises"
                  tone="violet"
                />
                <StatCard
                  icon="♡"
                  label="Need Assistance?"
                  value="Help Centre"
                  note="Guidance and support"
                  tone="rose"
                  onClick={() => setActivePage('Help Centre')}
                />
              </section>
{/* SmartFlex Sensor Measurements */}
<section className="mb-6 grid gap-4 sm:grid-cols-3">
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-slate-500">Joint Angle</p>
    <p className="mt-3 text-2xl font-bold text-slate-900">--°</p>
    <p className="mt-2 text-xs text-amber-600">Awaiting sensor data</p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-slate-500">Range of Motion</p>
    <p className="mt-3 text-2xl font-bold text-slate-900">--°</p>
    <p className="mt-2 text-xs text-slate-500">Measurement pending</p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-slate-500">Sensor Connection</p>
    <p className="mt-3 text-2xl font-bold text-slate-900">Pending</p>
    <p className="mt-2 text-xs text-amber-600">ESP32 integration pending</p>
  </div>
</section>
              <section className="grid items-start gap-6 xl:grid-cols-[1.35fr_0.85fr]">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-7">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Exercise checklist
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Mark an item when you complete it.
                      </p>
                    </div>
                    <span className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                      {completedCount}/{exercises.length} completed
                    </span>
                  </div>

                  <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
                      style={{ width: `${completion}%` }}
                    />
                  </div>

                  <div className="space-y-3">
                    {exercises.map((exercise, index) => (
                      <div
                        key={exercise.name}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-slate-50/70 sm:gap-4 sm:p-4"
                      >
                        <button
                          onClick={() => toggleExercise(index)}
                          aria-label={`Mark ${exercise.name} ${
                            completed[index] ? 'incomplete' : 'complete'
                          }`}
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${
                            completed[index]
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-700'
                          }`}
                        >
                          {completed[index] ? '✓' : index + 1}
                        </button>

                        <div className="min-w-0 flex-1">
                          <p className={`font-semibold ${
                            completed[index] ? 'text-slate-500' : 'text-slate-800'
                          }`}>
                            {exercise.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {exercise.detail}
                          </p>
                        </div>

                        <span
                          className={`hidden rounded-full px-3 py-1.5 text-xs font-semibold sm:inline-flex ${
                            completed[index]
                              ? 'bg-emerald-50 text-emerald-700'
                              : index === 2
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {completed[index] ? 'Completed' : index === 2 ? 'In Progress' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActivePage('Exercise Plan')}
                    className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Open full exercise plan <span className="ml-2">→</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-bold text-slate-900">Your activity</h2>
                        <p className="mt-1 text-sm text-slate-500">Checklist overview</p>
                      </div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-600">
                        ↗
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-5">
                      <div
                        className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: `conic-gradient(#2563eb ${completion * 3.6}deg, #e8eef8 0deg)`,
                        }}
                      >
                        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white">
                          <span className="text-2xl font-bold text-slate-900">{completion}%</span>
                          <span className="text-[10px] text-slate-500">Complete</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Keep going</p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          Your checklist updates as you mark exercises complete.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <h2 className="font-bold text-slate-900">Quick access</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Go straight to what you need.
                    </p>

                    <QuickLink
                      icon="▤"
                      title="Exercise Plan"
                      description="Review exercise instructions"
                      onClick={() => setActivePage('Exercise Plan')}
                    />
                    <QuickLink
                      icon="?"
                      title="Help Centre"
                      description="Find help using SmartFlex"
                      onClick={() => setActivePage('Help Centre')}
                    />
                  </div>
                </div>
              </section>
              <p className="mt-6 text-center text-xs text-slate-400">
                Demo interface · Exercise names and checklist states are sample content, not clinical recommendations.
              </p>
            </>
          )}

          {activePage === 'Exercise Plan' && (
            <section>
              <PageHeading
                eyebrow="YOUR REHABILITATION"
                title="Exercise Plan"
                description="Review your exercise checklist. Follow the plan prescribed by your physiotherapist."
              />
              <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="font-semibold text-blue-900">Your exercise checklist</p>
                <p className="mt-1 text-sm leading-6 text-blue-800">
                  These are demo exercises only. Your team must approve the final joint and exercise selection before they are used.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-bold">Assigned exercises</h2>
                  <span className="rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                    {completedCount} of {exercises.length} checked
                  </span>
                </div>
                <div className="space-y-4">
                  {exercises.map((exercise, index) => (
                    <div
                      key={exercise.name}
                      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
                    >
                      <button
                        onClick={() => toggleExercise(index)}
                        aria-label={`Mark ${exercise.name} ${
                          completed[index] ? 'incomplete' : 'complete'
                        }`}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${
                          completed[index] ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {completed[index] ? '✓' : index + 1}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{exercise.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{exercise.detail}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        completed[index]
                          ? 'bg-emerald-100 text-emerald-700'
                          : exercise.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {completed[index]
                          ? 'Completed'
                          : exercise.status === 'In Progress'
                            ? 'In Progress'
                            : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activePage === 'Help Centre' && (
            <section>
              <PageHeading
                eyebrow="WE'RE HERE TO HELP"
                title="Help Centre"
                description="Find guidance for navigating the SmartFlex patient dashboard."
              />
              <div className="grid gap-5 md:grid-cols-2">
                <HelpCard
                  icon="▤"
                  title="Using your dashboard"
                  description="Use Dashboard Overview to review your checklist and find quick links to your assigned pages."
                />
                <HelpCard
                  icon="✓"
                  title="Exercise checklist"
                  description="Use the checklist to mark items for demonstration purposes. In the connected application, follow your prescribed plan."
                />
                <HelpCard
                  icon="♧"
                  title="Exercise guidance"
                  description="Ask your physiotherapist if you are unsure how to perform an exercise. Do not rely on this demo for medical instructions."
                />
                <HelpCard
                  icon="✉"
                  title="Technical support"
                  description="If a feature does not work, contact your project support team and explain what happened."
                />
              </div>
              <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-white md:p-8">
                <p className="text-sm font-semibold text-blue-300">NEED PERSONAL GUIDANCE?</p>
                <h2 className="mt-2 text-2xl font-bold">Your care team comes first.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  For medical concerns, pain, or changes to your rehabilitation plan, contact your treating healthcare professional.
                </p>
              </div>
            </section>
          )}
          
        </main>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, note, tone, onClick }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    violet: 'bg-violet-50 text-violet-700',
    rose: 'bg-rose-50 text-rose-700',
  }

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-default sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl font-bold ${tones[tone]}`}>
          {icon}
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{note}</p>
    </button>
  )
}

function QuickLink({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 flex w-full items-center gap-4 rounded-xl border border-slate-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-slate-800">{title}</span>
        <span className="mt-1 block text-xs text-slate-500">{description}</span>
      </span>
      <span className="text-lg text-slate-400">→</span>
    </button>
  )
}

function PageHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-slate-500">{description}</p>
    </div>
  )
}

function HelpCard({ icon, title, description }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-700">
        {icon}
      </div>
      <h2 className="mt-5 text-lg font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-500">{description}</p>
    </article>
  )
}

export default App
