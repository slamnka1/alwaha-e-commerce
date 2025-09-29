'use client'

import { parseAsString, useQueryStates } from 'nuqs'

import React from 'react'

import { SecurityForm } from './_components/security-form'
import { SendOTPForm } from './_components/send-otp-form'

type Props = {}

const Security = (props: Props) => {
  const [{ phone_number }] = useQueryStates({
    phone_number: parseAsString.withDefault(''),
  })
  if (phone_number) {
    return <SecurityForm />
  }
  return (
    <div className="space-y-8">
      <SendOTPForm />
      {/* <SecurityForm /> */}
      {/* <OTPForm /> */}
    </div>
  )
}

export default Security
