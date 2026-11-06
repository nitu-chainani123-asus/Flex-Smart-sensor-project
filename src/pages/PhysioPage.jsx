
import { useState } from 'react'
import PhysioSidebar from '../components/PhysioSidebar'
import MyPatients from './MyPatients'
import PatientDetails from './PatientDetails'
import PhysioDashboard from './PhysioDashboard'
import PhysioAssessment from './PhysioAssessment'

function PhysioPage() {
  const [activePage, setActivePage] = useState('My Patients')
  const [selectedPatient, setSelectedPatient] = useState(null)

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 md:flex">
      <PhysioSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl">
          {activePage === 'My Patients' && (
            <MyPatients
              onViewDetails={(patient) => {
                setSelectedPatient(patient)
                setActivePage('Patient Details')
              }}
            />
          )}
          {activePage === 'Patient Details' && (
            <PatientDetails patient={selectedPatient} />
          )}
          {activePage === 'Dashboard Overview' && <PhysioDashboard />}
          {activePage === 'Assessment Analysis' && <PhysioAssessment />}
        </div>
      </main>
    </div>
  )
}

export default PhysioPage
