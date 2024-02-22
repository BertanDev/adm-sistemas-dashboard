'use client'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { LogOut } from 'lucide-react'
import { useWindowSize } from '@/hooks/useWindowSize'

export function LogOutButton() {
  const router = useRouter()
  const windowSize = useWindowSize()

  function handleLogout() {
    Cookies.remove('auth_token')
    router.push('/')
  }

  const shouldRenderButton = windowSize.width < 1300

  return (
    <>
      {shouldRenderButton ? (
        <button
          className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-red-500 hover:bg-gray-100"
          onClick={handleLogout}
        >
          <LogOut
            className="h-5 w-5 flex-none  text-red-500"
            aria-hidden="true"
          />
          Log out
        </button>
      ) : (
        <button
          className="text-red-600 text-left flex gap-4 items-center px-4 py-2 rounded hover:bg-blue-400"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="text-base font-semibold">LogOut</span>
        </button>
      )}
    </>
  )
}
