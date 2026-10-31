import { useState } from 'react'

function AdminUserManagement() {

  // Sample user records
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

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [selectedUser, setSelectedUser] = useState(null)

  const [activityLogs, setActivityLogs] = useState([
    {
      id: 1,
      action: 'User registered',
      details: 'Sample registration activity',
      time: '31 Oct 2026',
    },
  ])


  // Calculate user statistics
  const totalUsers = users.length

  const totalPatients = users.filter(
    user => user.role === 'Patient'
  ).length

  const totalPhysiotherapists = users.filter(
    user => user.role === 'Physiotherapist'
  ).length

  const activeUsers = users.filter(
    user => user.isActive
  ).length


  // Search and filter
  const filteredUsers = users.filter(user => {

    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())

    const matchesRole =
      roleFilter === 'All' || user.role === roleFilter

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && user.isActive) ||
      (statusFilter === 'Inactive' && !user.isActive)

    return matchesSearch && matchesRole && matchesStatus

  })


  // Add activity log
  const addLog = (action, details) => {

    setActivityLogs(previous => [
      {
        id: Date.now(),
        action,
        details,
        time: new Date().toLocaleString(),
      },
      ...previous,
    ])

  }


  // Activate or deactivate account
  const toggleStatus = (user) => {

    const newStatus = !user.isActive

    setUsers(previous =>
      previous.map(item =>
        item.id === user.id
          ? { ...item, isActive: newStatus }
          : item
      )
    )

    addLog(
      newStatus ? 'Account Activated' : 'Account Deactivated',
      `${user.name} (${user.id})`
    )

  }


  // Change user role
  const changeRole = (user, newRole) => {

    if (user.role === newRole) return

    setUsers(previous =>
      previous.map(item =>
        item.id === user.id
          ? { ...item, role: newRole }
          : item
      )
    )

    addLog(
      'User Role Changed',
      `${user.name}: ${user.role} → ${newRole}`
    )

  }


  return (

    <section>

      {/* PAGE HEADER */}

      <div className="mb-8">

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          SYSTEM MANAGEMENT
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          User Management
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-slate-500">
          Manage registered SmartFlex accounts, monitor user
          activity and control account access.
        </p>

      </div>


      {/* DEMO NOTICE */}

      <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">

        <p className="font-semibold text-blue-900">
          User Management Overview
        </p>

        <p className="mt-1 text-sm leading-6 text-blue-800">
          Displaying sample user records. Actual account
          information will be retrieved from MongoDB after
          backend integration.
        </p>

      </div>


      {/* STATISTICS CARDS */}

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {[
          {
            title: 'Registered Users',
            value: totalUsers,
            icon: '♙',
            color: 'bg-blue-50 text-blue-700',
          },
          {
            title: 'Total Patients',
            value: totalPatients,
            icon: '♡',
            color: 'bg-violet-50 text-violet-700',
          },
          {
            title: 'Physiotherapists',
            value: totalPhysiotherapists,
            icon: '✚',
            color: 'bg-emerald-50 text-emerald-700',
          },
          {
            title: 'Active Users',
            value: activeUsers,
            icon: '✓',
            color: 'bg-amber-50 text-amber-700',
          },
        ].map(stat => (

          <article
            key={stat.title}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>

              </div>

              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-bold ${stat.color}`}>
                {stat.icon}
              </span>

            </div>

          </article>

        ))}

      </div>


      {/* USER TABLE CARD */}

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="border-b border-slate-100 p-5 md:p-6">

          <h2 className="text-lg font-bold text-slate-900">
            Registered Accounts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage all registered users.
          </p>


          {/* SEARCH AND FILTERS */}

          <div className="mt-6 grid gap-3 md:grid-cols-3">

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
            />


            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
            >

              <option value="All">All Roles</option>
              <option value="Patient">Patient</option>
              <option value="Physiotherapist">Physiotherapist</option>
              <option value="Admin">Admin</option>

            </select>


            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
            >

              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>

            </select>

          </div>

        </div>


        {/* USER TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">

              <tr>

                <th className="px-5 py-4 font-semibold">
                  User ID
                </th>

                <th className="px-5 py-4 font-semibold">
                  Name / Email
                </th>

                <th className="px-5 py-4 font-semibold">
                  Role
                </th>

                <th className="px-5 py-4 font-semibold">
                  Registration Date
                </th>

                <th className="px-5 py-4 font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 font-semibold">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {filteredUsers.length > 0 ? (

                filteredUsers.map(user => (

                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* USER ID */}

                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">
                      {user.id}
                    </td>


                    {/* USER NAME AND EMAIL */}

                    <td className="px-5 py-4">

                      <p className="font-semibold text-slate-800">
                        {user.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {user.email}
                      </p>

                    </td>


                    {/* ROLE */}

                    <td className="px-5 py-4">

                      <select
                        value={user.role}
                        onChange={e => changeRole(user, e.target.value)}
                        className="max-w-40 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-400"
                        aria-label={`Change role for ${user.name}`}
                      >

                        <option value="Patient">Patient</option>
                        <option value="Physiotherapist">Physiotherapist</option>
                        <option value="Admin">Admin</option>

                      </select>

                    </td>


                    {/* REGISTRATION DATE */}

                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {user.createdAt}
                    </td>


                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        user.isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>

                        {user.isActive ? 'Active' : 'Inactive'}

                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex flex-wrap gap-2">

                        <button
                          onClick={() => setSelectedUser(user)}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                        >
                          View
                        </button>

                        <button
                          onClick={() => toggleStatus(user)}
                          className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                            user.isActive
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >

                          {user.isActive ? 'Deactivate' : 'Activate'}

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No users found. Try changing your search or filters.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* TABLE FOOTER */}

        <div className="border-t border-slate-100 px-5 py-4">

          <p className="text-xs text-slate-500">
            Showing {filteredUsers.length} of {totalUsers} registered users
          </p>

        </div>

      </div>


      {/* USER DETAILS MODAL */}

      {selectedUser && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-900">
                User Details
              </h2>

              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close user details"
              >
                ✕
              </button>

            </div>

            <div className="mt-6 space-y-4">

              {[
                ['User ID', selectedUser.id],
                ['Full Name', selectedUser.name],
                ['Email', selectedUser.email],
                ['Role', selectedUser.role],
                ['Registration Date', selectedUser.createdAt],
                ['Account Status', selectedUser.isActive ? 'Active' : 'Inactive'],
              ].map(([label, value]) => (

                <div
                  key={label}
                  className="border-b border-slate-100 pb-3"
                >

                  <p className="text-xs font-medium text-slate-500">
                    {label}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {value}
                  </p>

                </div>

              ))}

            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* ADMINISTRATIVE ACTIVITY / AUDIT LOGS */}

      <div className="mt-7 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6">

        <h2 className="text-lg font-bold text-slate-900">
          Administrative Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Record of account management actions performed in this demo.
        </p>

        <div className="mt-5 space-y-4">

          {activityLogs.map(log => (

            <div
              key={log.id}
              className="flex flex-col justify-between gap-2 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center"
            >

              <div>

                <p className="text-sm font-semibold text-slate-800">
                  {log.action}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {log.details}
                </p>

              </div>

              <span className="text-xs text-slate-500">
                {log.time}
              </span>

            </div>

          ))}

        </div>

      </div>


      {/* FOOTER */}

      <p className="mt-6 text-center text-xs text-slate-400">
        SmartFlex Admin · User Management · Demonstration Interface
      </p>

    </section>

  )

}

export default AdminUserManagement