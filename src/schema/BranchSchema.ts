import * as yup from 'yup'

const BranchSchema = yup.object().shape({
  name: yup.string().min(1).nullable().required('Branch name is required'),
  code: yup.string().min(1).nullable().notRequired(),
  telephone: yup.string().nullable().notRequired(),
  mobile: yup.string().nullable().notRequired(),
  country: yup.string().min(1).nullable().required('Coutry is required'),
  regionState: yup
    .string()
    .min(1)
    .nullable()
    .required('Region or state is required'),
  city: yup.string().min(1).nullable().required('City is required'),
  addressLine1: yup
    .string()
    .min(1)
    .nullable()
    .required('Address line 1 is required'),
  addressLine2: yup.string().nullable().notRequired(),
  postal: yup.string().nullable().notRequired(),
  longitude: yup.string().nullable().notRequired(),
  latitude: yup.string().nullable().notRequired(),
})

export const BranchForm = BranchSchema.pick([
  'name',
  'code',
  'country',
  'regionState',
  'city',
  'addressLine1',
  'addressLine2',
  'postal',
  'longitude',
  'latitude',
  'telephone',
  'mobile',
])
