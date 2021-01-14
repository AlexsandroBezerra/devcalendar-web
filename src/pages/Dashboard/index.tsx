import React, { useCallback, useMemo, useState } from 'react'
import DayPicker from 'react-day-picker'
import { FiPlus, FiInfo } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { format } from 'date-fns'

import logoImg from '../../assets/logo.svg'
import { useAuth } from '../../hooks/Auth'

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

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day)
  }, [])

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Day' dd")
  }, [selectedDate])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc')
  }, [selectedDate])

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
            <Event>
              <strong>{"Mother's birthday"}</strong>

              <div>
                <span></span>
                <FiInfo size={20} />
              </div>
            </Event>

            <Event>
              <strong>{"Mother's birthday"}</strong>

              <div>
                <span>06:00PM - 11:59PM</span>
                <FiInfo size={20} />
              </div>
            </Event>
          </EventsList>
        </Main>
      </Content>
    </Container>
  )
}

export default Dashboard
