import { api } from '@/lib/axios/initAxios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t')

  const successRoute = new URL('/?st=t', req.url)
  const failedRoute = new URL('/?st=f', req.url)

  try {
    await api.post('/confirm-recover', {
      recover_token: token,
    })

    return NextResponse.redirect(successRoute)
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(failedRoute)
  }
}
