export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: "2,420", change: "+12%", color: "bg-primary-500" },
          { title: "Active Sessions", value: "1,210", change: "+8%", color: "bg-emerald-500" },
          { title: "Documents", value: "342", change: "+3%", color: "bg-amber-500" },
          { title: "Messages", value: "89", change: "-2%", color: "bg-rose-500" },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
              <span className={`h-3 w-3 rounded-full ${stat.color}`}></span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span className={stat.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"}>
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main chart area */}
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics Overview</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Monthly performance data</p>
          <div className="mt-6 flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-400">Chart placeholder</p>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            {[
              { action: "New user registered", time: "2 min ago" },
              { action: "Document uploaded", time: "15 min ago" },
              { action: "Settings updated", time: "1 hour ago" },
              { action: "Report generated", time: "3 hours ago" },
              { action: "User role changed", time: "5 hours ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.action}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table area */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Name</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Email</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Role</th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
                { name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
                { name: "Bob Wilson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
              ].map((user) => (
                <tr key={user.email} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{user.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
