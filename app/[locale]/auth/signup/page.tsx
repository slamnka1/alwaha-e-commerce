import React from 'react'

import Image from 'next/image'

import { SignupImage } from '@/assets'

import SignupForm from './_components/signup-form'

const SignupPage = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
        <div className="w-2/3 md:w-1/2">
          <Image alt="signup" className="mx-auto" src={SignupImage} />
        </div>
        <div className="w-full md:w-1/2">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default SignupPage
