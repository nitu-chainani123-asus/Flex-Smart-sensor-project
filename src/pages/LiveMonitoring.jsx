
import { useEffect, useMemo, useState } from "react";
import {
  Activity, BatteryCharging, Bluetooth, Gauge,
  Pause, Play, RotateCcw, Save,
  Signal, TimerReset, Waves,
} from "lucide-react";
import {
  AreaChart, Area, CartesianGrid, ReferenceLine,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const jointProfiles = {
  Knee: {
    label: "Knee Joint",
    maxAngle: 150,
    startAngle: 72,
    referenceAngle: 96,
  },
  Elbow: {
    label: "Elbow Joint",
    maxAngle: 150,
    startAngle: 86,
    referenceAngle: 108,
  },
  Shoulder: {
    label: "Shoulder Joint",
    maxAngle: 180,
    startAngle: 104,
    referenceAngle: 122,
  },
};

const formatTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const createInitialRange = (joint) => {
  const profile = jointProfiles[joint];
  const initial = profile.startAngle;
  return [
    { time: formatTime(), angle: initial, reference: profile.referenceAngle },
    { time: formatTime(), angle: initial + 4, reference: profile.referenceAngle },
    { time: formatTime(), angle: initial + 8, reference: profile.referenceAngle },
  ];
};

export default function LiveMonitoring() {
  const [joint, setJoint] = useState("Knee");
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [sessionState, setSessionState] = useState("Idle");
  const [angle, setAngle] = useState(jointProfiles.Knee.startAngle);
  const [signalQuality, setSignalQuality] = useState(96);
  const [lastReceived, setLastReceived] = useState("--:--:--");
  const [rawAdc, setRawAdc] = useState(1732);
  const [status, setStatus] = useState("Calibrated");
  const [missingData, setMissingData] = useState(false);
  const [readings, setReadings] = useState(() => createInitialRange("Knee"));
  const [saveMessage, setSaveMessage] = useState("");

  const profile = jointProfiles[joint];
  const maxAngle = profile.maxAngle;
  const referenceAngle = profile.referenceAngle;

  const selectJoint = (nextJoint) => {
    const nextProfile = jointProfiles[nextJoint];
    setJoint(nextJoint);
    setAngle(nextProfile.startAngle);
    setSignalQuality(96);
    setLastReceived("--:--:--");
    setRawAdc(Math.round(nextProfile.startAngle * 24));
    setStatus("Calibrated");
    setMissingData(false);
    setReadings(createInitialRange(nextJoint));
    setRecording(false);
    setPaused(false);
    setSessionState("Idle");
    setSaveMessage("");
  };

  const stats = useMemo(() => {
    const values = readings.map((entry) => entry.angle);
    if (!values.length) {
      return { min: Number(angle.toFixed(1)), max: Number(angle.toFixed(1)), avg: Number(angle.toFixed(1)) };
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((total, value) => total + value, 0) / values.length;

    return {
      min: Number(min.toFixed(1)),
      max: Number(max.toFixed(1)),
      avg: Number(avg.toFixed(1)),
    };
  }, [angle, readings]);

  useEffect(() => {
    if (!recording || paused) return undefined;

    const timer = setInterval(() => {
      const previous = angle;
      const drift = (Math.random() * 12) - 5;
      const next = clamp(previous + drift, 0, maxAngle);
      const time = formatTime();
      const updatedSignal = clamp(Math.round(99 - Math.abs(next - referenceAngle) * 0.3), 74, 99);
      const lastReading = {
        time,
        angle: Number(next.toFixed(1)),
        reference: referenceAngle,
      };

      setAngle(next);
      setSignalQuality(updatedSignal);
      setLastReceived(time);
      setRawAdc(Math.round(next * 24 + Math.random() * 40));
      setStatus(next > referenceAngle + 12 ? "Calibration drift" : "Calibrated");
      setMissingData(Math.random() < 0.08);
      setReadings((existing) => [...existing.slice(-19), lastReading]);
    }, 1600);

    return () => clearInterval(timer);
  }, [angle, maxAngle, paused, recording, referenceAngle]);

  const startRecording = () => {
    setRecording(true);
    setPaused(false);
    setSessionState("Recording");
    setSaveMessage("");
  };

  const pauseRecording = () => {
    setPaused(true);
    setRecording(false);
    setSessionState("Paused");
  };

  const endSession = () => {
    setRecording(false);
    setPaused(false);
    setSessionState("Ended");
  };

  const saveSession = () => {
    const rows = [
      ["Time", "Joint", "Angle (degrees)", "Reference angle (degrees)"],
      ...readings.map(({ time, angle: readingAngle, reference }) => [
        time,
        joint,
        readingAngle,
        reference,
      ]),
    ];
    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\r\n");
    const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `smartflex-${joint.toLowerCase()}-${new Date().toISOString().replace(/[:.]/g, "-")}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);

    setSessionState((current) => current === "Recording" ? current : "Saved");
    setSaveMessage("Session data downloaded as CSV.");
  };

  const resetSession = () => {
    setRecording(false);
    setPaused(false);
    setSessionState("Idle");
    setAngle(profile.startAngle);
    setSignalQuality(96);
    setLastReceived("--:--:--");
    setRawAdc(Math.round(profile.startAngle * 24));
    setStatus("Calibrated");
    setMissingData(false);
    setReadings(createInitialRange(joint));
    setSaveMessage("");
  };

  const progressPercent = Math.round((angle / maxAngle) * 100);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="px-4 py-5 sm:px-6 sm:py-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Live Monitoring</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-4 sm:py-8">
        <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="min-w-0 space-y-4 sm:space-y-6">
            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-slate-500">Device connection</p>
                  <h2 className="mt-1 text-lg font-bold sm:text-xl">SmartFlex Wearable</h2>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {recording ? "Connected" : "Standby"}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Device name</span>
                  <span className="wrap-break-word font-semibold">Flex Sensor 01</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Identifier</span>
                  <span className="wrap-break-word font-semibold">SF-2048-A</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Connection status</span>
                  <span className="font-semibold text-emerald-600">Stable</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Last data received</span>
                  <span className="font-semibold">{lastReceived}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Sensor availability</span>
                  <span className="font-semibold text-sky-600">Available</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Transmission</span>
                  <span className="font-semibold text-violet-600">Live</span>
                </div>
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Sensor diagnostics</h3>
                <Signal size={18} className="text-emerald-500" />
              </div>

              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Raw ADC</span>
                  <span className="font-semibold">{rawAdc}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Calibrated angle</span>
                  <span className="font-semibold">{Number(angle.toFixed(1))}°</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Calibration</span>
                  <span className="wrap-break-word font-semibold text-emerald-600">{status}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Missing data</span>
                  <span className={`font-semibold ${missingData ? "text-amber-600" : "text-emerald-600"}`}>
                    {missingData ? "Detected" : "Nominal"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-slate-500">Signal quality</span>
                  <span className="font-semibold text-violet-600">{signalQuality}%</span>
                </div>
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <label className="block text-sm font-medium text-slate-700">Joint selector</label>
              <select
                value={joint}
                onChange={(event) => selectJoint(event.target.value)}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-500"
              >
                {Object.entries(jointProfiles).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
              <p className="mt-3 text-sm text-slate-500">
                Selected profile loads the correct calibration envelope for {profile.label.toLowerCase()}.
              </p>
            </section>
          </aside>

          <div className="min-w-0 space-y-4 sm:space-y-6">
            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Live angle</p>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{Number(angle.toFixed(1))}°</h2>
                </div>
                <div className="flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:text-sm">
                  <Bluetooth size={15} className="text-blue-600" />
                  {sessionState}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <MetricCard icon={<Gauge size={16} />} label="Min observed" value={`${stats.min}°`} tone="sky" />
                <MetricCard icon={<Activity size={16} />} label="Avg observed" value={`${stats.avg}°`} tone="emerald" />
                <MetricCard icon={<Waves size={16} />} label="Max observed" value={`${stats.max}°`} tone="violet" />
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">Live angle visualization</h3>
                  <p className="text-sm text-slate-500">Realtime joint motion and reference angle tracking</p>
                </div>
                <div className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  Reference: {referenceAngle}°
                </div>
              </div>

              <div className="h-56 min-w-0 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={readings}>
                    <defs>
                      <linearGradient id="liveAngleFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#64748b" tickLine={false} axisLine={false} minTickGap={24} />
                    <YAxis domain={[0, maxAngle]} tick={{ fontSize: 11 }} stroke="#64748b" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#cbd5e1' }} />
                    <ReferenceLine y={referenceAngle} stroke="#f59e0b" strokeDasharray="6 6" ifOverflow="extendDomain" />
                    <Area type="monotone" dataKey="angle" stroke="#0f766e" fill="url(#liveAngleFill)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">Session controls</h3>
                  <p className="text-sm text-slate-500">Manage live capture and save data output</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {sessionState}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 lg:grid-cols-3 sm:gap-3">
                <ActionButton
                  color="emerald"
                  icon={<Play size={16} />}
                  label={paused ? "Resume recording" : "Start recording"}
                  onClick={startRecording}
                  disabled={recording}
                />
                <ActionButton color="amber" icon={<Pause size={16} />} label="Pause recording" onClick={pauseRecording} disabled={!recording} />
                <ActionButton color="rose" icon={<TimerReset size={16} />} label="End session" onClick={endSession} disabled={!recording && !paused} />
                <ActionButton color="slate" icon={<Save size={16} />} label="Save session" onClick={saveSession} />
                <ActionButton color="sky" icon={<RotateCcw size={16} />} label="Reset" onClick={resetSession} />
              </div>
              <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-emerald-700">
                {saveMessage}
              </p>

              <div className="mt-5 rounded-xl bg-slate-50 p-3 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-1 text-sm text-slate-600">
                  <span>Joint angle progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-linear-to-r from-teal-500 to-cyan-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="mt-4 min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold">Recent sensor readings</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
              <BatteryCharging size={16} className="text-emerald-500" />
              Intake stable
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-105 text-left text-xs sm:min-w-full sm:text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2 font-semibold">Time</th>
                  <th className="px-3 py-2 font-semibold">Angle</th>
                  <th className="px-3 py-2 font-semibold">Ref.</th>
                  <th className="px-3 py-2 font-semibold">Signal</th>
                </tr>
              </thead>
              <tbody>
                {[...readings].reverse().slice(0, 6).map((entry, index) => (
                  <tr key={`${entry.time}-${index}`} className="border-t border-slate-200">
                    <td className="px-3 py-3">{entry.time}</td>
                    <td className="px-3 py-3 font-medium">{entry.angle.toFixed(1)}°</td>
                    <td className="px-3 py-3">{entry.reference}°</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                        {signalQuality}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}

function MetricCard({ icon, label, value, tone }) {
  const toneClasses = {
    sky: "bg-sky-50 text-sky-700",
    emerald: "bg-emerald-50 text-emerald-700",
    violet: "bg-violet-50 text-violet-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className={`inline-flex rounded-xl p-2 ${toneClasses[tone]}`}>
        {icon}
      </div>
      <p className="mt-3 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ActionButton({ color, icon, label, onClick, disabled = false }) {
  const classes = {
    emerald: "bg-emerald-600 text-white hover:bg-emerald-700",
    amber: "bg-amber-500 text-white hover:bg-amber-600",
    rose: "bg-rose-600 text-white hover:bg-rose-700",
    slate: "bg-slate-900 text-white hover:bg-slate-800",
    sky: "bg-sky-600 text-white hover:bg-sky-700",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50 ${classes[color]}`}
    >
      {icon}
      {label}
    </button>
  );
}
