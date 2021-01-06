import { animated } from 'react-spring'

import styled, { css } from 'styled-components'

interface ContainerProps {
  type?: 'default' | 'success' | 'error'
  hasdescription?: number
}

const toastTypeVariations = {
  default: css`
    background: #ebf8ff;
    color: #3172b7;
  `,

  success: css`
    background: #ebfffa;
    color: #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `
}

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'default']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top 0;
      }
    `}
`
