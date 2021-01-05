import React, { InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: object
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  return (
    <Container style={containerStyle}>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}

export default Input
