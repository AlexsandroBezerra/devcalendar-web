import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.white};
  border-radius: 18px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid ${props => props.theme.white};
  color: ${props => props.theme.placeholder};

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

  &:focus-within {
    border: 2px solid ${props => props.theme.primary};

    svg {
      color: ${props => props.theme.primary};
    }
  }
`
