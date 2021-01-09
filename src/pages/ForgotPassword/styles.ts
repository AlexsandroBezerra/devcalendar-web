import { shade, lighten } from 'polished'
import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1120px;
  margin: 0 auto;
`

export const Background = styled.div`
  width: 640px;

  img:first-child {
    height: 100px;
  }

  img:last-child {
    margin-top: 64px;
    height: 464px;
  }
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`

export const Content = styled.main`
  animation: ${appearFromLeft} 1s;
  width: 352px;

  h1 {
    text-align: center;
    margin-bottom: 80px;
    font-size: 54px;
  }

  form {
    width: 100%;

    button {
      display: block;
      width: 100%;
      margin-top: 24px;
      border: none;
      background: ${props => props.theme.primary};
      padding: 18px;
      border-radius: 18px;
      color: ${props => props.theme.white};
      font-weight: 500;

      transition: background-color 0.2s;

      &:hover {
        background: ${props => shade(0.2, props.theme.primary)};
      }
    }

    a {
      display: block;
      margin: 32px 0 80px;
      text-decoration: none;
      text-align: center;
      color: ${props => props.theme.text};
      font-weight: 500;

      transition: background-color 0.2s;

      &:hover {
        color: ${props => lighten(0.1, props.theme.text)};
      }
    }
  }

  a {
    display: block;
    text-decoration: none;
    text-align: center;
    color: ${props => props.theme.primary};
    font-weight: 500;
    margin-top: 80px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 8px;
    }

    transition: background-color 0.2s;

    &:hover {
      color: ${props => shade(0.2, props.theme.primary)};
    }
  }
`
