import React, { useCallback, useRef, useState } from 'react'
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import calendarImg from '../../assets/calendar.svg'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useToast } from '../../hooks/Toast'
// import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Background, Content } from './styles'

interface FormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      try {
        setIsLoading(true)

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('It is not a valid email')
            .required('Email is required')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        // await api.post('users', data)

        addToast({
          type: 'success',
          title: 'Recovery email sent',
          description:
            'We sent an email to confirm password recovery, check your inbox.'
        })

        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          return formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Password recovery error',
          description:
            'An error occurred while trying to recover your password, please try again.'
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
        <h1>Reset Password</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiMail} name="email" placeholder="E-mail" />

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

export default ForgotPassword
