import React from 'react'

import Image from 'next/image'

import { LoginImage } from '@/assets'

import LoginForm from './_components/login-form'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
        <div className="w-2/3 md:w-1/2">
          <Image alt="login" className="mx-auto" src={LoginImage} />
        </div>
        <div className="w-full md:w-1/2">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
