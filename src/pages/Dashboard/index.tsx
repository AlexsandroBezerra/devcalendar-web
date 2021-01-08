import React from 'react'

import Button from '../../components/Button'
import { useAuth } from '../../hooks/Auth'

import { Container } from './styles'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <h1>Hello, {user.name}!</h1>
      <h2>The app is coming soon...</h2>

      <Button onClick={signOut} loading={false}>
        Sign Out
      </Button>
    </Container>
  )
}

export default Dashboard
