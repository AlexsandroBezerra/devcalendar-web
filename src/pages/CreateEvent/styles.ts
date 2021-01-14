import { shade } from 'polished'
import styled, { css } from 'styled-components'

interface SelectButtonProps {
  active: boolean
}

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

    img {
      width: 296px;
    }

    a {
      display: flex;
      align-items: center;
      color: ${props => props.theme.text};
      text-decoration: none;
      margin-left: 40px;

      svg {
        margin-right: 8px;
      }
    }
  }
`

export const Content = styled.div`
  max-width: 736px;
  margin: 32px auto 64px;

  button {
    svg {
      margin-left: 8px;
    }
  }
`

export const InputContainer = styled.div`
  & + div {
    margin-top: 24px;
  }

  label {
    font-size: 24px;
    margin-bottom: 8px;
    display: block;
  }

  input {
    word-break: break-word;
  }
`

export const SelectButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  gap: 32px;
`

export const SelectButton = styled.button<SelectButtonProps>`
  flex: 1;
  height: 100%;
  border-radius: 20px;
  border: none;
  background: ${props => props.theme.white};

  transition: background-color 0.2s;

  &:hover {
    background: ${props => shade(0.05, props.theme.white)};
  }

  ${props =>
    props.active &&
    css`
      background: ${props => props.theme.primary};
      color: ${props => props.theme.white};
      font-weight: 500;

      &:hover {
        background: ${props => shade(0.2, props.theme.primary)};
      }
    `}
`

export const InputGroupContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  > div {
    flex: 1;
    margin-top: 0;
  }
`
