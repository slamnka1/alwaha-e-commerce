import React from 'react'

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen py-8 bg-primary/2  flex items-center justify-center">
      {children}
    </section>
  )
}

export default ProfileLayout
