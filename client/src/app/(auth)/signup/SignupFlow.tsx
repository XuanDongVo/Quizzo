'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/stores'
import AccountTypeStep from './steps/AccountTypeStep'
import WorkspaceStep from './steps/WorkspaceStep'
import UserInfoStep from './steps/UserInfoStep'

export default function SignupFlow() {
  const step = useSelector((state: RootState) => state.signup.step)

  switch (step) {
    case 1: return <AccountTypeStep />
    case 2: return <WorkspaceStep />
    case 3: return <UserInfoStep />
    default: return <AccountTypeStep />
  }
}
