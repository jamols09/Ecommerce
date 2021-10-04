import * as yup from 'yup'

const ProductSchema = yup.object().shape({
  name: yup.string().min(3).required('Product name is required'),
  sku: yup.string(),
  department: yup.string().nullable().required('Please select department'),
  description: yup.string().required('Product description is required'),
  images: yup.mixed().required('Please select an image'),

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
  'images',
])
