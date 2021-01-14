import React, { useCallback, useRef, useState } from 'react'
import { FiArrowLeft, FiCalendar, FiClock, FiPlus } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'
import 'react-day-picker/lib/style.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useToast } from '../../hooks/Toast'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import {
  Container,
  Header,
  Content,
  InputContainer,
  SelectButtonsContainer,
  SelectButton,
  InputGroupContainer
} from './styles'

interface FormData {
  title: string
  description: string
  date: string
  from?: string
  to?: string
}

const CreateEvent: React.FC = () => {
  const [isAllDay, setIsAllDay] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()

  const handleSetAllDay = useCallback(() => {
    setIsAllDay(true)
  }, [])

  const handleSetNoAllDay = useCallback(() => {
    setIsAllDay(false)
  }, [])

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      try {
        setIsLoading(true)
        console.log(data)

        const [year, month, day] = data.date.split('-').map(Number)

        const formattedDate = new Date(year, month - 1, day)

        await api.post('events', {
          title: data.title,
          description: data.description,
          date: formattedDate,
          from: data.from,
          to: data.to
        })

        addToast({
          type: 'success',
          title: 'Event added successfully',
          description: 'The event was added, now you can see it.'
        })

        history.push('/app')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          return formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Error when adding new event',
          description:
            'An error occurred while adding new event, please try again.'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Header>
        <div>
          <img src={logoImg} alt="DevCalendar" />

          <Link to="/app">
            <FiArrowLeft size={20} />
            Back
          </Link>
        </div>
      </Header>

      <Content>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <InputContainer>
            <label htmlFor="title">Title</label>
            <Input name="title" id="title" />
          </InputContainer>

          <InputContainer>
            <label htmlFor="description">
              Description <span>(optional)</span>
            </label>
            <Input name="description" id="description" />
          </InputContainer>

          <InputContainer>
            <label htmlFor="date">Date</label>
            <Input icon={FiCalendar} name="date" id="date" type="date" />
          </InputContainer>

          <InputContainer>
            <label>All day</label>
            <SelectButtonsContainer>
              <SelectButton
                type="button"
                active={isAllDay}
                onClick={handleSetAllDay}
              >
                Yes
              </SelectButton>
              <SelectButton
                type="button"
                active={!isAllDay}
                onClick={handleSetNoAllDay}
              >
                No
              </SelectButton>
            </SelectButtonsContainer>
          </InputContainer>

          {!isAllDay && (
            <InputGroupContainer>
              <InputContainer>
                <label htmlFor="from">From</label>
                <Input icon={FiClock} name="from" id="from" type="time" />
              </InputContainer>

              <InputContainer>
                <label htmlFor="to">To</label>
                <Input icon={FiClock} name="to" id="to" type="time" />
              </InputContainer>
            </InputGroupContainer>
          )}

          <Button loading={isLoading}>
            Add new event
            <FiPlus size={20} />
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default CreateEvent
