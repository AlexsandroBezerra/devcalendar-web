import React, { useCallback, useRef, useState } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import calendarImg from '../../assets/calendar.svg'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useToast } from '../../hooks/Toast'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Background, Content } from './styles'

interface FormData {
  name: string
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()
  const { addToast } = useToast()

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      try {
        setIsLoading(true)

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('It is not a valid email')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('users', data)

        addToast({
          type: 'success',
          title: 'Registration completed',
          description: 'You can now login to DevCalendar!'
        })

        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          return formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Registration Error',
          description: 'An error occurred while registering, please try again.'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Content>
        <h1>Sign Up</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiUser} name="name" placeholder="Name" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />

          <Button type="submit" loading={isLoading}>
            Create account
          </Button>
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
