import React, { useCallback, useRef, useState } from 'react'
import { FiLock } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useToast } from '../../hooks/Toast'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container } from './styles'

interface FormData {
  password: string
  passwordConfirmation: string
}

const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()

  const { addToast } = useToast()

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      try {
        setIsLoading(true)

        const schema = Yup.object().shape({
          password: Yup.string().required('Password is required'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Bad confirmation'
          )
        })

        await schema.validate(data, {
          abortEarly: false
        })

        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          return formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Error resetting password',
          description:
            'An error occurred while resetting your password, try again.'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <img src={logoImg} alt="DevCalendar" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="New password"
        />

        <Input
          icon={FiLock}
          name="passwordConfirmation"
          type="password"
          placeholder="Password confirmation"
        />

        <Button type="submit" loading={isLoading}>
          Enter
        </Button>
      </Form>
    </Container>
  )
}

export default ResetPassword
