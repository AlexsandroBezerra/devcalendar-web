import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DayPicker from 'react-day-picker'
import { FiPlus, FiInfo } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { format } from 'date-fns'

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
  Event
} from './styles'

interface Event {
  id: string
  title: string
  from?: string
  to?: string
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    api
      .get('events', {
        params: {
          date: selectedDate
        }
      })
      .then(response => {
        setEvents(response.data)
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

          <Link to="/app" onClick={signOut}>
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
            {formattedEvents.map(event => (
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
          </EventsList>
        </Main>
      </Content>
    </Container>
  )
}

export default Dashboard
