import React from 'react'

import Image from 'next/image'

import { SignupImage } from '@/assets'

import SignupForm from './_components/signup-form'

type Props = {}

const SignupPage = (props: Props) => {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
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
