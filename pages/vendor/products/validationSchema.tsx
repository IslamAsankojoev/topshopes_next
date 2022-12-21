import * as yup from 'yup'

// form field validation schema
export const productFormValidationSchema = yup.object().shape({
	title: yup.string().required('title required'),
	categories: yup.array().min(1).required('categories required'),
	colors: yup.array().min(1).required('colors required'),
	discount: yup.number().required('discount required'),
	price: yup.string().required('price required'),
	published: yup.boolean().required('published required'),
	rating: yup.string().required('rating required'),
	sizes: yup.array().min(1).required('sizes required'),
	brand: yup.string().required('brand required'),
	thumbnail: yup.mixed().required('thumbnail required'),
	unit: yup.string().required('unit required'),
	images: yup.array(),
})
