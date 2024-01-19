'use client'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export function LogOutButton() {
  const router = useRouter()

  function handleLogout() {
    Cookies.remove('auth_token')
    router.push('/')
  }

  return (
    <button
      className="text-red-600 block px-4 py-2 rounded hover:bg-blue-500"
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}
