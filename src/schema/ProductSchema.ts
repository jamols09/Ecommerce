import * as yup from 'yup'

const ProductSchema = yup.object().shape({
  name: yup.string().min(3).required('Product name is required'),
  sku: yup.string(),
  department: yup.string().nullable().required('Please select department'),
  description: yup.string().required('Product description is required'),
  file: yup.string().required(),

  active: yup.boolean().default(true),
  discountable: yup.boolean(),
  displayQuantity: yup.boolean(),
  quantity: yup.number(),
  quantityWarn: yup.number(),
  price: yup.number(),
})

export const ProductInfoSchema = ProductSchema.pick([
  'name',
  'sku',
  'description',
  'department',
])
