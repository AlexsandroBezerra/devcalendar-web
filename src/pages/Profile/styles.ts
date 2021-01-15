import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  > header {
    height: 144px;
    background: ${props => props.theme.box};

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      display: flex;

      img {
        width: 296px;
      }

      a {
        display: flex;
        align-items: center;

        margin-left: 32px;
        text-decoration: none;
        color: ${props => props.theme.text};
        font-weight: 500;

        span {
          display: block;
        }

        svg {
          color: ${props => props.theme.text};
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
      }
    }

    button {
      border: none;
      background: none;
      padding: 12px 0 12px 12px;
    }
  }
`

export const Content = styled.div`
  width: 100%;
  margin: -176px auto 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    text-align: center;

    margin: 65px 0;
    width: 340px;

    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: ${props => props.theme.primary};
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: ${props => props.theme.white};
    }

    &:hover {
      background: ${props => shade(0.2, props.theme.primary)};
    }
  }
`
