import { IUser } from 'shared/types/user.types'

export const categoryEditForm = [
	{
		name: 'name',
		label: 'name',
		type: 'text',
		placeholder: 'Enter name',
		required: true,
	},
	{
		name: 'description',
		label: 'description',
		type: 'text',
		placeholder: 'Enter description',
		required: true,
	},
	{
		name: 'icon',
		label: 'icon',
		type: 'file',
		placeholder: 'Enter icon',
		required: false,
	},
	{
		name: 'image',
		label: 'image',
		type: 'file',
		placeholder: 'Enter image',
		required: true,
	},

	// {
	// 	name: 'featured',
	// 	label: 'Featured',
	// 	type: 'checkbox',
	// 	placeholder: 'Enter featured',
	// 	required: false,
	// },
	// {
	// 	label: 'Slug',
	// 	type: 'text',
	// 	placeholder: 'Enter slug',
	// 	required: true,
	// },
	// {
	// 	label: 'Parent',
	// 	type: 'text',
	// 	placeholder: 'Enter parent',
	// 	required: true,
	// },
]
export const brandEditForm = [
	{
		name: 'name',
		label: 'name',
		type: 'text',
		placeholder: 'Enter name',
		required: true,
	},
	{
		name: 'image',
		label: 'image',
		type: 'file',
		placeholder: 'Upload image',
		required: true,
	},
]

export const sizeEditForm = [
	{
		name: 'name',
		label: 'name',
		type: 'text',
		placeholder: 'Enter name',
		required: true,
	},
]

export const brandTypeEditForm = [
	{
		name: 'name',
		label: 'name',
		type: 'text',
		placeholder: 'Enter name',
		required: true,
	},
]

export const colorEditForm = [
	{
		name: 'name',
		label: 'name',
		type: 'text',
		placeholder: 'Enter name',
		required: true,
	},
	{
		name: 'color',
		label: 'color',
		type: 'color',
		placeholder: 'Enter color',
		required: true,
	},
]

export const userEditForm = [
	{
		name: 'first_name',
		label: 'first_name',
		type: 'text',
		placeholder: 'Enter first_name',
		required: true,
	},
	{
		name: 'last_name',
		label: 'last_name',
		type: 'text',
		placeholder: 'Enter last_name',
		required: false,
	},
	{
		name: 'email',
		label: 'email',
		type: 'email',
		placeholder: 'Enter email',
		required: true,
	},
	{
		name: 'phone',
		label: 'phone',
		type: 'text',
		placeholder: 'Enter phone',
		required: true,
	},
	{
		name: 'avatar',
		label: 'avatar',
		type: 'file',
		placeholder: 'Upload avatar',
		required: false,
	},
	{
		name: 'password',
		label: 'password',
		type: 'text',
		placeholder: 'Enter password',
		required: false,
	},
]
