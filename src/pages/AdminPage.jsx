
import { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminDashboard from './AdminDashboard'

function AdminPage() {
  const [activePage, setActivePage] = useState('Dashboard Overview')

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 md:flex">
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <AdminDashboard />
        </div>
      </main>
    </div>
  )
}

export default AdminPage
