import React, { useState, ChangeEvent, useCallback, useRef } from 'react'
import {
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiArrowLeft,
  FiPower
} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/Auth'
import { useToast } from '../../hooks/Toast'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Content, AvatarInput } from './styles'

interface ProfileFormData {
  name: string
  email: string
  oldPassword: string
  password: string
  passwordConfirmation: string
}

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        setIsLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('Email is required')
            .email('Invalid email'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: (val?: string) => Boolean(val?.length),
            then: Yup.string().min(6, 'Password must be at least 6 characters'),
            otherwise: Yup.string()
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: (val?: string) => Boolean(val?.length),
              then: Yup.string().min(
                6,
                'Password must be at least 6 characters'
              ),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password')], 'Bad confirmation')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const {
          name,
          email,
          oldPassword,
          password,
          passwordConfirmation
        } = data

        const formData = Object.assign(
          {
            name,
            email
          },
          oldPassword
            ? {
                oldPassword,
                password,
                passwordConfirmation
              }
            : {}
        )

        const response = await api.put('/profile', formData)

        updateUser(response.data)

        addToast({
          type: 'success',
          title: 'Successfully updated',
          description: 'Your profile was successfully updated!'
        })

        history.push('/app')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Updating error',
          description:
            'An error occurred while updating your profile, please try again.'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [history, addToast, updateUser]
  )

  const handleAvatarChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData()

        data.append('avatar', event.target.files[0])

        const response = await api.patch('/users/avatar', data)

        updateUser(response.data)

        addToast({
          type: 'success',
          title: 'Successfully updated'
        })
      }
    },
    [addToast, updateUser]
  )

  return (
    <Container>
      <header>
        <div>
          <div>
            <img src={logoImg} alt="GoBarber" />

            <Link to="/app">
              <FiArrowLeft />
              <span>Back</span>
            </Link>
          </div>

          <button type="button" onClick={signOut}>
            <FiPower size={20} />
          </button>
        </div>
      </header>

      <Content>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email
          }}
        >
          <AvatarInput>
            <img src={user.avatarUrl} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="Old password"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="New password"
          />

          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="Password confirmation"
          />

          <Button type="submit" loading={isLoading}>
            Update profile
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
