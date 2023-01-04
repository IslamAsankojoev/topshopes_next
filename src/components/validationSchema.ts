import * as yup from 'yup'

// form field validation schema
export const productFormValidationSchemaVendor = yup.object().shape({
	title: yup.string().required('title required'),
	published: yup.boolean().required('published required'),
	category: yup.string().required('shop required'),
	brand: yup.string().required('brand required'),
	unit: yup.string().required('unit required'),
})

export const productFormValidationSchema = yup.object().shape({
	title: yup.string().required('title required'),
	published: yup.boolean().required('published required'),
	category: yup.string().required('shop required'),
	brand: yup.string().required('brand required'),
	unit: yup.string().required('unit required'),
	shop: yup.string().required('shop required'),
})
