import React, { ButtonHTMLAttributes } from 'react'
import Loader from 'react-loader-spinner'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container {...rest} disabled={loading} loading={Number(loading)}>
    {loading ? (
      <Loader type="TailSpin" color="#fff" height={15} width={15} />
    ) : (
      children
    )}
  </Container>
)

export default Button
