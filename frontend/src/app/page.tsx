"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to appropriate page
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Rakshak Securitas Pvt. Ltd.
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      </div>
    </div>
  );
}
