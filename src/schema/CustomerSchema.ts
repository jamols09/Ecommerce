import * as yup from 'yup'

const CustomerSchema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  middlename: yup.string().nullable(),
  lastname: yup.string().nullable(),
  birthdate: yup.date().nullable().required('Birthdate is required'),
  options: yup.array().of(yup.string()).nullable(),
  username: yup.string().min(4).required('Username is required'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
  passwordConfirm: yup
    .string()
    .required('Confirmation is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    }),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required'),
})

export const CustomerForm = CustomerSchema.pick([
  'firstname',
  'middlename',
  'lastname',
  'birthdate',
  'username',
  'email',
  'options',
  'password',
  'passwordConfirm',
])