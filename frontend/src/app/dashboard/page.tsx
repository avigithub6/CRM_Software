"use client";
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';

interface Stats {
  incidents: number;
  guards: number;
  audits: number;
  alerts: number;
}

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const [stats, setStats] = useState<Stats>({ incidents: 0, guards: 0, audits: 0, alerts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setError('Authentication token not found');
        setLoading(false);
        return;
      }

      try {
        // Only fetch statistics if user has appropriate role
        if (user?.role === 'Admin' || user?.role === 'Security' || user?.role === 'Supervisor') {
          const [incidents, guards, audits, alerts] = await Promise.all([
            fetch('http://localhost:5000/api/incidents', { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }),
            fetch('http://localhost:5000/api/guards', { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }),
            fetch('http://localhost:5000/api/audits', { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }),
            fetch('http://localhost:5000/api/alerts', { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }),
          ]);

          // Check if any request failed
          if (!incidents.ok || !guards.ok || !audits.ok || !alerts.ok) {
            throw new Error('One or more API requests failed');
          }

          const [incidentsData, guardsData, auditsData, alertsData] = await Promise.all([
            incidents.json(),
            guards.json(),
            audits.json(),
            alerts.json(),
          ]);

          setStats({
            incidents: incidentsData.length,
            guards: guardsData.length,
            audits: auditsData.length,
            alerts: alertsData.length,
          });
        } else {
          // For Client role, show limited statistics
          setStats({
            incidents: 0,
            guards: 0,
            audits: 0,
            alerts: 0,
          });
        }
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Failed to fetch statistics. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token, user?.role]);

  const quickActions = [
    { title: 'Report Incident', href: '/incidents', color: 'bg-red-500' },
    { title: 'Add Guard', href: '/guards', color: 'bg-blue-500' },
    { title: 'Schedule Audit', href: '/audits', color: 'bg-green-500' },
    { title: 'View Alerts', href: '/alerts', color: 'bg-yellow-500' },
  ];

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Welcome, {user?.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">Role: {user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
          {/* Show different content based on user role */}
          {user?.role === 'Client' ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Client Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to your client dashboard. Here you can view your security details and report incidents.
              </p>
              <div className="mt-4">
                <Link 
                  href="/incidents"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Report an Incident
                </Link>
              </div>
            </div>
          ) : (
            /* KPIs for Admin, Security, and Supervisor roles */
            <>
              {loading ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Loading statistics...</div>
              ) : error ? (
                <div className="text-center text-red-500 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                  {error}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.incidents}</div>
                    <div className="text-gray-500 dark:text-gray-400">Incidents</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.guards}</div>
                    <div className="text-gray-500 dark:text-gray-400">Guards</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.audits}</div>
                    <div className="text-gray-500 dark:text-gray-400">Audits</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.alerts}</div>
                    <div className="text-gray-500 dark:text-gray-400">Alerts</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 