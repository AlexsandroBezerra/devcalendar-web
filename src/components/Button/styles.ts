import { shade } from 'polished'
import styled, { css } from 'styled-components'

interface ContainerProps {
  loading?: number
}

export const Container = styled.button<ContainerProps>`
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

  ${props =>
    props.loading &&
    css`
      cursor: not-allowed;
      background: red;
    `}
`
