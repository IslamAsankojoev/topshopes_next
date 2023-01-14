import * as yup from 'yup'

export const productFormValidationSchemaVendor = yup.object().shape({
	name: yup.string().required('title required'),
	description: yup.string().required('description required'),
	category: yup.object().required('shop required'),
	brand: yup.object().required('brand required'),
	unit: yup.string().required('unit required'),
})

export const productFormValidationSchema = yup.object().shape({
	name: yup.string().required('title required'),
	description: yup.string().required('description required'),
	category: yup.object().required('shop required'),
	brand: yup.object().required('brand required'),
	unit: yup.string().required('unit required'),
	shop: yup.object().required('shop required'),
})
