'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = searchParams.get('from') || '/admin';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to register.');
        setLoading(false);
        return;
      }

      // Use window.location for full page reload to ensure cookie is available
      window.location.href = from;
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Register</h1>
        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md text-sm transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <a
            href={`/admin/auth/login?from=${encodeURIComponent(from)}`}
            className="text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default function AdminRegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">Admin Register</h1>
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}



