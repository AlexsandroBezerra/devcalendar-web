import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DayPicker from 'react-day-picker'
import { FiPlus, FiInfo } from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'

import { format } from 'date-fns'

import catImg from '../../assets/cat.svg'
import logoImg from '../../assets/logo.svg'
import { useAuth } from '../../hooks/Auth'
import api from '../../services/api'
import convertTime from '../../utils/convertTime'

import 'react-day-picker/lib/style.css'
import {
  Container,
  Header,
  Content,
  Aside,
  Calendar,
  Main,
  EventsList,
  Event,
  LoaderContainer
} from './styles'

interface Event {
  id: string
  title: string
  from?: string
  to?: string
}

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    setIsLoading(true)

    api
      .get('events', {
        params: {
          date: selectedDate
        }
      })
      .then(response => {
        setEvents(response.data)
        setIsLoading(false)
      })
  }, [selectedDate])

  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day)
  }, [])

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Day' dd")
  }, [selectedDate])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc')
  }, [selectedDate])

  const formattedEvents = useMemo(() => {
    return events.map(event => ({
      ...event,
      from: event.from && convertTime(event.from),
      to: event.to && convertTime(event.to)
    }))
  }, [events])

  return (
    <Container>
      <Header>
        <div>
          <img src={logoImg} alt="DevCalendar" />

          <Link to="/profile">
            <strong>{user.name}</strong>
            <img src={user.avatarUrl} alt={user.name} />
          </Link>
        </div>
      </Header>

      <Content>
        <Aside>
          <Calendar>
            <DayPicker
              modifiers={{
                available: {
                  daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
                }
              }}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
            />
          </Calendar>

          <Link to="/create-event">
            Add new Event
            <FiPlus />
          </Link>
        </Aside>

        <Main>
          <div>
            <span>Next events</span>

            <p>
              <span>{selectedDateAsText}</span>
              <span>{selectedWeekDay}</span>
            </p>
          </div>

          <EventsList>
            {!isLoading &&
              formattedEvents.map(event => (
                <Event key={event.id}>
                  <strong>{event.title}</strong>

                  <div>
                    <span>
                      {event.from && event.to && `${event.from} - ${event.to}`}
                    </span>
                    <FiInfo size={20} />
                  </div>
                </Event>
              ))}

            {!isLoading && formattedEvents.length === 0 && (
              <LoaderContainer>
                <img src={catImg} alt="A cat" />
                <h2>No events...</h2>
              </LoaderContainer>
            )}

            {isLoading && (
              <LoaderContainer>
                <Loader type="TailSpin" color="#2B63FF" />
              </LoaderContainer>
            )}
          </EventsList>
        </Main>
      </Content>
    </Container>
  )
}

export default Dashboard
