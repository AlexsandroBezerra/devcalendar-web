import React, { useCallback } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import calendarImg from '../../assets/calendar.svg'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import { Container, Background, Content } from './styles'

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
    },
    []
  )

  return (
    <Container>
      <Background>
        <img src={logoImg} alt="DevCalendar" />

        <img src={calendarImg} alt="A calendar" />
      </Background>

      <Content>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <Input icon={FiMail} placeholder="E-mail" />
          <Input icon={FiLock} type="password" placeholder="Password" />

          <button type="submit">Enter</button>

          <Link to="/">Forgot my Password</Link>
        </form>

        <Link to="/">
          <FiLogIn />
          Create Account
        </Link>
      </Content>
    </Container>
  )
}

export default SignIn
