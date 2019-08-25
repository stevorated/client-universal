import { isEmail, isLength } from 'validator'

export default (e, handleFormState) => {
  const name = e.target.name
  const value = e.target.value
  const newData = {
    [name]: value
  }
  switch (name) {
    case 'fname':
      if (value && !isLength(value, { min: 2, max: 30 })) {
        handleFormState({ fnameError: true })
        handleFormState({ fnameGood: false })
      } else if (value && isLength(value, { min: 2, max: 30 })) {
        handleFormState({ fnameError: false })
        handleFormState({ fnameGood: true })
      }
      return handleFormState(newData)
    case 'lname':
      if (value && !isLength(value, { min: 2, max: 30 })) {
        handleFormState({ lnameError: true })
        handleFormState({ lnameGood: false })
      } else if (value && isLength(value, { min: 2, max: 30 })) {
        handleFormState({ lnameError: false })
        handleFormState({ lnameGood: true })
      }
      return handleFormState(newData)
    case 'username':
      if (value && !isLength(value, { min: 4, max: 30 })) {
        handleFormState({ usernameError: true })
        handleFormState({ usernameGood: false })
      } else if (
        errors &&
        errors.username &&
        value &&
        isLength(value, { min: 2, max: 30 })
      ) {
        handleFormState({ usernameError: false })
        handleFormState({ usernameGood: true })
      } else if (value && isLength(value, { min: 2, max: 30 })) {
        handleFormState({ usernameError: false })
        handleFormState({ usernameGood: true })
      }
      return handleFormState(newData)
    case 'email':
      if (value && !isEmail(value)) {
        handleFormState({ emailError: true })
        handleFormState({ emailGood: false })
      } else if (errors && errors.email && value && isEmail(value)) {
        handleFormState({ emailError: false })
        handleFormState({ emailGood: true })
      } else if (value && isEmail(value)) {
        handleFormState({ emailError: false })
        handleFormState({ emailGood: true })
      }
      return handleFormState(newData)
    case 'password':
      if (
        value &&
        !value.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)
      ) {
        handleFormState({
          passwordError: true,
          passwordGood: false,
          weak: null,
          better: null,
          great: null
        })
      } else if (
        value &&
        value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/
        )
      ) {
        handleFormState({
          passwordError: false,
          passwordGood: true,
          great: true,
          better: null,
          weak: null
        })
      } else if (
        value &&
        value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%#*^?&]{8,30}$/
        )
      ) {
        handleFormState({
          passwordError: false,
          passwordGood: true,
          great: null,
          better: true,
          weak: null
        })
      } else if (
        value &&
        value.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%#*^?&]{6,30}$/)
      ) {
        handleFormState({
          passwordError: false,
          passwordGood: true,
          great: null,
          better: null,
          weak: true
        })
      }
      return handleFormState(newData)
    default:
      break
  }
}