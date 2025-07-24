'use client'

import { useGetUserQuery } from '@/store/api/authApi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * This page acts as a router for authenticated users.
 * The middleware ensures only users with a valid token can access this page.
 * It then uses a client-side query to get the user's role and redirect
 * them to the appropriate role-specific dashboard.
 */
export default function DashboardPage() {
  const { data: user, isLoading, isError } = useGetUserQuery()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      return // Wait for the query to complete
    }

    if (isError) {
      // This should ideally not happen if the middleware is working correctly,
      // but as a fallback, we redirect to sign-in.
      router.replace('/signin')
      return
    }

    if (user) {
      switch (user.role) {
        case 'ADMIN':
          router.replace('/admin/dashboard')
          break
        case 'INSTRUCTOR':
          router.replace('/instructor/dashboard')
          break
        case 'STUDENT':
          router.replace('/learner/dashboard')
          break
        default:
          // Fallback for unknown roles
          router.replace('/home')
          break
      }
    }
  }, [user, isLoading, isError, router])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="text-lg font-semibold text-gray-700">Redirecting to your dashboard...</div>
    </div>
  )
} 