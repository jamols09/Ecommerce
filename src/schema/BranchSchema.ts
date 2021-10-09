import * as yup from 'yup'

const telError = {
  message: 'Invalid format',
  excludeEmptyString: true,
}

const BranchSchema = yup.object().shape({
  name: yup.string().nullable().required('Branch name is required'),
  code: yup.string().min(4).nullable().notRequired(),
  telephone: yup.string().matches(new RegExp('^[0-9- ]{7,14}$'), telError),
  mobile: yup.string().nullable().notRequired(),
  country: yup.string().nullable().required('Country is required'),
  regionState: yup.string().nullable().required('Region or state is required'),
  city: yup.string().nullable().required('City is required'),
  addressLine1: yup.string().nullable().required('Address line 1 is required'),
  addressLine2: yup.string().nullable().notRequired(),
  postal: yup.string().nullable().notRequired(),
  longitude: yup.string().nullable().notRequired(),
  latitude: yup.string().nullable().notRequired(),
  options: yup.array(yup.string()),
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
