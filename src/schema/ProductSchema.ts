import * as yup from 'yup'

const ProductSchema = yup.object().shape({
  name: yup.string().min(3).required('Product name is required'),
  sku: yup.string(),
  department: yup.string().nullable().required('Please select department'),
  description: yup.string().required('Product description is required'),
  images: yup.mixed().required('Please select an image'),

  options: yup.array().of(yup.string()),
  branches: yup
    .array()
    .of(yup.string())
    .nullable()
    .required('Please select a branch'),
  quantity: yup.number().typeError('Empty field not allowed'),
  quantityWarn: yup.number().typeError('Empty field not allowed'),
  tags: yup.array().of(yup.string()).nullable().notRequired(),
  colors: yup.array().of(yup.string()).nullable().notRequired(),
  sizes: yup.array().of(yup.string()).nullable().notRequired(),
  weightUnit: yup.string().nullable(),
  weightAmount: yup.number().typeError('Empty field not allowed'),
  dimensionUnit: yup.string().nullable(),
  dimensionLength: yup.number().typeError('Empty field not allowed'),
  dimensionHeight: yup.number().typeError('Empty field not allowed'),
  dimensionWidth: yup.number().typeError('Empty field not allowed'),

  price: yup.number().typeError('Empty field not allowed'),
})

export const ProductInfoSchema = ProductSchema.pick([
  'name',
  'sku',
  'description',
  'department',
  'images',
])

export const ProductSpecsSchema = ProductSchema.pick([
  'branches',
  'quantity',
  'quantityWarn',
  'tags',
  'colors',
  'sizes',
  'weightUnit',
  'weightAmount',
  'dimensionUnit',
  'dimensionLength',
  'dimensionHeight',
  'dimensionWidth',
])

export const ProductPricingSchema = ProductSchema.pick(['price'])
