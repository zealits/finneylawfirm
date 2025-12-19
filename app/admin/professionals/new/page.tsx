'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  { value: 'ATTORNEYS', label: 'Attorneys' },
  { value: 'OF_COUNSEL', label: 'Of Counsel' },
  { value: 'PARALEGALS', label: 'Paralegals' },
  { value: 'ADMIN_STAFF', label: 'Admin Staff' },
  { value: 'LAW_CLERKS_AND_INTERNS', label: 'Law Clerks and Interns' },
];

const practiceAreaOptions = [
  'Commercial Real Estate',
  'Residential Real Estate',
  'Corporate Transactional',
  'Business & Commercial Litigation',
  'Labor & Employment Law',
  'Small Business Solutions Group',
  'Estate Planning & Administration',
  'Public Interest Law',
  'Personal Injury',
  'Property Tax Valuation',
  'Ivy Pointe Title',
];

export default function NewProfessionalPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    category: 'ATTORNEYS',
    phone: '',
    email: '',
  });
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [biography, setBiography] = useState('');
  const [education, setEducation] = useState('');
  const [memberships, setMemberships] = useState('');
  const [admittedToPractice, setAdmittedToPractice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePracticeAreaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    setSelectedPracticeAreas((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      selectedPracticeAreas.forEach((area) => {
        formData.append('practiceAreas', area);
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      formData.append('biography', biography);
      formData.append('education', education);
      formData.append('memberships', memberships);
      formData.append('admittedToPractice', admittedToPractice);

      const res = await fetch('/api/professionals', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create professional.');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold mb-4">Add Professional</h1>
        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Practice Areas
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {practiceAreaOptions.map((area) => (
                <label key={area} className="flex items-center space-x-2 text-xs">
                  <input
                    type="checkbox"
                    value={area}
                    checked={selectedPracticeAreas.includes(area)}
                    onChange={handlePracticeAreaChange}
                    className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span>{area}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <div className="flex items-center space-x-3">
              <label className="inline-flex items-center px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold cursor-pointer">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-600 truncate max-w-[200px]">
                {imageFile ? imageFile.name : 'No file selected'}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              Image will be uploaded to <code>/public/images/team-members</code>.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Biography
            </label>
            <textarea
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              rows={4}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Education
            </label>
            <textarea
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="One entry per line"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Memberships
            </label>
            <textarea
              value={memberships}
              onChange={(e) => setMemberships(e.target.value)}
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="One entry per line"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Admitted To Practice
            </label>
            <textarea
              value={admittedToPractice}
              onChange={(e) => setAdmittedToPractice(e.target.value)}
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="One entry per line"
            />
          </div>

          <div className="md:col-span-2 flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-yellow-500 hover:bg-yellow-600 text-white font-semibold disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



