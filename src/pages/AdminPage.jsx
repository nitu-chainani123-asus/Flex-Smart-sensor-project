
import { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminDashboard from './AdminDashboard'
import AdminUserManagement from './Adminusermanagement'

function AdminPage() {
  const [activePage, setActivePage] = useState('Dashboard Overview')
  const [users, setUsers] = useState([
    {
      id: 'SF-P001',
      name: 'Aarav Sharma',
      email: 'aarav@gmail.com',
      role: 'Patient',
      isActive: true,
      createdAt: '12 Oct 2026',
    },
    {
      id: 'SF-P002',
      name: 'Priya Verma',
      email: 'priya@gmail.com',
      role: 'Patient',
      isActive: true,
      createdAt: '15 Oct 2026',
    },
    {
      id: 'SF-P003',
      name: 'Rohan Patel',
      email: 'rohan@gmail.com',
      role: 'Patient',
      isActive: false,
      createdAt: '18 Oct 2026',
    },
    {
      id: 'SF-PT001',
      name: 'Dr. Anjali Mehta',
      email: 'anjali@gmail.com',
      role: 'Physiotherapist',
      isActive: true,
      createdAt: '10 Oct 2026',
    },
    {
      id: 'SF-PT002',
      name: 'Dr. Rahul Deshmukh',
      email: 'rahul@gmail.com',
      role: 'Physiotherapist',
      isActive: true,
      createdAt: '14 Oct 2026',
    },
    {
      id: 'SF-A001',
      name: 'Admin User',
      email: 'admin@smartflex.com',
      role: 'Admin',
      isActive: true,
      createdAt: '01 Oct 2026',
    },
  ])

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 md:flex">
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl">

          {activePage === 'Dashboard Overview' && <AdminDashboard users={users} />}

          {activePage === 'User Management' && (
            <AdminUserManagement users={users} setUsers={setUsers} />
          )}

</div>
      </main>
    </div>
  )
}

export default AdminPage
