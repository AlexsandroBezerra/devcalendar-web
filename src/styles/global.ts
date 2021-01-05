import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  @media(min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`
