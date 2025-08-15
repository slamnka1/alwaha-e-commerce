import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex min-h-screen items-center justify-center py-8">
      {children}
    </section>
  )
}

export default AuthLayout
