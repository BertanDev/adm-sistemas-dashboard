'use client'
import Cookies from 'js-cookie'

export const getAuthTokenClient = () => {
  const token = Cookies.get('auth_token')

  return token
}
