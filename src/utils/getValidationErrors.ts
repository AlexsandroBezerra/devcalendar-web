import { ValidationError } from 'yup'

interface Errors {
  [key: string]: string
}

function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {}

  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message
    }
  })

  return validationErrors
}

export default getValidationErrors
