import React, { useCallback } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
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
      <Content>
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <Input icon={FiUser} placeholder="Name" />
          <Input icon={FiMail} placeholder="E-mail" />
          <Input icon={FiLock} type="password" placeholder="Password" />

          <button type="submit">Create account</button>
        </form>

        <Link to="/">
          <FiArrowLeft />
          Back to login
        </Link>
      </Content>

      <Background>
        <img src={logoImg} alt="DevCalendar" />

        <img src={calendarImg} alt="A calendar" />
      </Background>
    </Container>
  )
}

export default SignIn
