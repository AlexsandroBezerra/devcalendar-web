import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
`

export const Header = styled.header`
  height: 144px;
  background-color: ${props => props.theme.box};

  > div {
    height: 100%;
    max-width: 1120px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 296px;
    }

    a {
      display: flex;
      align-items: center;
      color: ${props => props.theme.text};
      text-decoration: none;

      strong {
        margin-right: 8px;
      }

      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
      }
    }
  }
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 56px auto;

  display: flex;
  justify-content: space-between;
`

export const Aside = styled.aside`
  width: 352px;

  a {
    width: 100%;
    padding: 22px;
    margin: 40px 0;
    background-color: ${props => props.theme.primary};
    border-radius: 20px;
    color: ${props => props.theme.white};
    text-decoration: none;
    font-weight: 500;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 8px;
    }
  }
`

export const Calendar = styled.div`
  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: ${props => props.theme.placeholder};
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavBar {
    color: ${props => props.theme.white} !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Weekday {
    color: ${props => props.theme.placeholder};
    font-weight: 500;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: ${props => props.theme.box};
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: ${props => props.theme.white};

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${props => props.theme.background};
    border-radius: 10px;
    color: ${props => props.theme.text};
    font-weight: 500;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${props => shade(0.2, props.theme.background)};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  /* .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  } */

  .DayPicker-Day--selected {
    background: ${props => props.theme.primary} !important;
    border-radius: 10px;
    color: ${props => props.theme.white} !important;
  }
`

export const Main = styled.main`
  max-width: 641px;
  width: 100%;

  div {
    > span {
      font-size: 36px;
    }

    p {
      display: flex;
      margin-top: 8px;
      align-items: center;
      color: ${props => props.theme.primary};
      font-weight: 500;

      span {
        display: flex;
        align-items: center;
      }

      span + span::before {
        content: '';
        background: ${props => props.theme.primary};
        width: 1px;
        height: 12px;
        margin: 0 8px;
      }
    }
  }
`

export const EventsList = styled.div`
  width: 100%;
  margin-top: 32px;
`

export const Event = styled.div`
  padding: 24px;
  background: ${props => props.theme.box};
  border-radius: 20px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    span {
      font-size: 16px;
      color: ${props => props.theme.placeholder};
    }

    svg {
      margin-left: 8px;
    }
  }

  & + div {
    margin-top: 12px;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 320px;

  h2 {
    margin-top: 48px;
  }
`
