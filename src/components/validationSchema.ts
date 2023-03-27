import * as yup from 'yup'

// form field validation schema
export const productFormValidationSchemaVendor = yup.object().shape({
	name: yup.string().required('Name required'),
	category: yup.string().required('Category required'),
	brand: yup.string().required('Brand required'),
	unit: yup.string().required('Unit required'),
	description: yup.string().required('Description required'),
	is_published: yup.boolean().required('Publish required'),
})

export const productFormValidationSchema = yup.object().shape({
	name: yup.string().required('Name required'),
	category: yup.string().required('Category required'),
	brand: yup.string().required('Brand required'),
	unit: yup.string().required('Unit required'),
	description: yup.string().required('Description required'),
	is_published: yup.boolean().required('Publish required'),
})
