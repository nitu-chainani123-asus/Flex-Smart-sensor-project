
import { useState } from 'react'
import PhysioSidebar from '../components/PhysioSidebar'
import MyPatients from './MyPatients'
import PatientDetails from './PatientDetails'
import PhysioDashboard from './PhysioDashboard'

function PhysioPage() {
  const [activePage, setActivePage] = useState('My Patients')

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 md:flex">
      <PhysioSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {activePage === 'My Patients' && <MyPatients />}
          {activePage === 'Patient Details' && <PatientDetails />}
          {activePage === 'Dashboard Overview' && <PhysioDashboard />}
        </div>
      </main>
    </div>
  )
}

export default PhysioPage
