import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  text-align: center;

  span {
    background: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    width: 160px;

    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      position: absolute;
      content: '';
      border-style: solid;
      border-color: ${props => props.theme.primary} transparent;
      border-width: 6px 6px 0 6px;

      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`
