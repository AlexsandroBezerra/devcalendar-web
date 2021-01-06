import React, { useCallback } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'

import calendarImg from '../../assets/calendar.svg'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'

import { Container, Background, Content } from './styles'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const handleSubmit: SubmitHandler<SignInFormData> = useCallback(data => {
    console.log(data)
  }, [])

  return (
    <Container>
      <Background>
        <img src={logoImg} alt="DevCalendar" />

        <img src={calendarImg} alt="A calendar" />
      </Background>

      <Content>
        <h1>Sign In</h1>

        <Form onSubmit={handleSubmit}>
          <Input icon={FiMail} name="email" placeholder="E-mail" />

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />

          <button type="submit">Enter</button>

          <Link to="/">Forgot my Password</Link>
        </Form>

        <Link to="/sign-up">
          <FiLogIn />
          Create Account
        </Link>
      </Content>
    </Container>
  )
}

export default SignIn
