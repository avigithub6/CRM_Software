"use client";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow mb-8">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-bold text-lg text-blue-700 dark:text-blue-300">Rakshak CRM</Link>
          <Link href="/clients" className="hover:underline">Clients</Link>
          <Link href="/guards" className="hover:underline">Guards</Link>
          <Link href="/incidents" className="hover:underline">Incidents</Link>
          <Link href="/training" className="hover:underline">Training</Link>
          <Link href="/audits" className="hover:underline">Audits</Link>
          <Link href="/alerts" className="hover:underline">Alerts</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user && (
            <>
              <span className="text-gray-700 dark:text-gray-200">{user.name} ({user.role})</span>
              <button onClick={logout} className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 