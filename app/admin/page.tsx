import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/admin/auth/login');
  }

  const professionals = await prisma.professional.findMany({
    orderBy: { lastName: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <form
            action="/api/admin/logout"
            method="POST"
          >
            <button
              type="submit"
              className="text-sm text-gray-600 hover:text-red-600"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Welcome, {admin.name || admin.email}
            </h2>
            <p className="text-sm text-gray-600">
              Use this panel to manage team members for the professionals page.
            </p>
          </div>
          <a
            href="/admin/professionals/new"
            className="inline-flex items-center px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold"
          >
            Add Professional
          </a>
        </div>

        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Existing Team Members
          </h3>
          {professionals.length === 0 ? (
            <p className="text-sm text-gray-500">
              No professionals added yet.
            </p>
          ) : (
            <div className="overflow-hidden border border-gray-200 rounded-md bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">
                      Category
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">
                      Email
                    </th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {professionals.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-3 py-2">
                        {`${p.firstName ?? ''} ${p.middleName ?? ''} ${
                          p.lastName ?? ''
                        }`.trim() || '—'}
                      </td>
                      <td className="px-3 py-2 text-gray-700">
                        {p.category || '—'}
                      </td>
                      <td className="px-3 py-2 text-gray-700">
                        {p.email || '—'}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <a
                          href={`/admin/professionals/${p.id}/edit`}
                          className="text-xs font-semibold text-yellow-600 hover:text-yellow-700"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

