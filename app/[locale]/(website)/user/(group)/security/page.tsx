import React from 'react'

import { OTPForm } from './_components/otp'
import { SecurityForm } from './_components/security-form'

type Props = {}

const Security = (props: Props) => {
  return (
    <div className="space-y-8">
      <SecurityForm />
      <OTPForm />
    </div>
  )
}

export default Security
