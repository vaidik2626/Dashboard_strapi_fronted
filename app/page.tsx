'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Redirecting to dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mini Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Simple Lead Management System
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-500">
            Manage your leads efficiently with our simple and intuitive dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-md border border-gray-300 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✅ Add, edit, and delete leads</li>
            <li>✅ Filter leads by status</li>
            <li>✅ User authentication</li>
            <li>✅ Responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
