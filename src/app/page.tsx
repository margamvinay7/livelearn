'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * The root page now only serves to redirect to the public home page.
 * All authentication-based routing is now handled by the middleware.
 */
export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/home')
  }, [router])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="text-lg font-semibold text-gray-700">Loading...</div>
    </div>
  )
}
