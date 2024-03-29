import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import calendarImg from '../../assets/calendar.svg'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/Auth'
import { useToast } from '../../hooks/Toast'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Background, Content } from './styles'

interface FormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      try {
        setIsLoading(true)

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('It is not a valid email')
            .required('Email is required'),
          password: Yup.string().required('Password is required')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await signIn({
          email: data.email,
          password: data.password
        })

        addToast({
          type: 'success',
          title: 'Authentication success',
          description: 'The app is coming soon...'
        })

        history.push('/app')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          return formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Authentication error',
          description:
            'An error occurred while logging in, check your credentials.'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [addToast, history, signIn]
  )

  return (
    <Container>
      <Background>
        <img src={logoImg} alt="DevCalendar" />

        <img src={calendarImg} alt="A calendar" />
      </Background>

      <Content>
        <h1>Sign In</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiMail} name="email" placeholder="E-mail" />

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />

          <Button type="submit" loading={isLoading}>
            Enter
          </Button>

          <Link to="/forgot-password">Forgot my Password</Link>
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
