import styled, { css } from 'styled-components'

import Tooltip from './Tooltip'

interface ContainerProps {
  error: number
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.white};
  border-radius: 20px;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  border: 2px solid ${props => props.theme.white};
  color: ${props => props.theme.placeholder};

  &:focus-within {
    border: 2px solid ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }

  & + div {
    margin-top: 16px;
  }

  input {
    background: transparent;
    color: ${props => props.theme.text};
    border: none;

    width: 100%;

    &::placeholder {
      color: ${props => props.theme.placeholder};
    }
  }

  svg {
    margin-right: 16px;
  }

  ${props =>
    props.error &&
    css`
      border: 2px solid #c53030;
      color: #c53030;
    `}
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`
