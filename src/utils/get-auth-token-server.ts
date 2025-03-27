import { cookies } from 'next/headers'

export const getAuthTokenServer = () => {
  // const token = sessionStorage.getItem('auth_token')
  const cookieStore = cookies()
  const token = cookieStore.get('auth_token')?.value

  return token
}
