import React, { useCallback } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'

import calendarImg from '../../assets/calendar.svg'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import api from '../../services/api'

import { Container, Background, Content } from './styles'

interface FormData {
  name: string
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const handleSubmit: SubmitHandler<FormData> = useCallback(async data => {
    const response = await api.post('users', data)

    console.log(response)
  }, [])

  return (
    <Container>
      <Content>
        <h1>Sign Up</h1>

        <Form onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <button type="submit">Create account</button>
        </Form>

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
