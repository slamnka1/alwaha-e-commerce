import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function POST() {
  console.log('🚀 ~ POST ~ logout')
  const cookieStore = await cookies()
  cookieStore.delete('session')

  return redirect('/')
}
