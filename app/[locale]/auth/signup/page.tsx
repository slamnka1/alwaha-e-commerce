import { SignupImage } from "@/assets"
import SignupForm from "./_components/signup-form"
import Image from "next/image"
import React from "react"

type Props = {}

const SignupPage = (props: Props) => {
  return (
    <section className="min-h-screen flex items-center justify-center">
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
    </section>
  )
}

export default SignupPage
