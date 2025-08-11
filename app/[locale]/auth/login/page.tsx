import { LoginImage } from "@/assets"
import LoginForm from "./_components/login-form"
import Image from "next/image"
import React from "react"

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="flex items-center justify-center gap-10">
          <div className="w-1/2">
            <Image alt="login" src={LoginImage} />
          </div>
          <div className="w-1/2">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
