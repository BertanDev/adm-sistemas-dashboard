import { api } from '@/lib/axios/initAxios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t')

  const baseUrl = new URL('http://18.229.226.244:3000')

  const successRoute = new URL('/?st=t', baseUrl)
  const failedRoute = new URL('/?st=f', baseUrl)

  try {
    await api.post('/confirm-recover', {
      recover_token: token,
    })

    return NextResponse.redirect(successRoute)
  } catch (error) {
    return NextResponse.redirect(failedRoute)
  }
}
