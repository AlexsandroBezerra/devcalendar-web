import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  max-width: 1120px;
  margin: 0 auto;

  img {
    margin-bottom: 80px;
  }

  form {
    padding: 0 24px;
    width: 512px;

    input {
      width: 100%;
    }
  }
`
