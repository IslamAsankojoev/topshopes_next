import { IPayment } from 'shared/types/order.types'
import { IShopForm } from 'shared/types/shop.types'
import { IUser } from 'shared/types/user.types'
import { statusTranslation } from 'utils/Translate/common'
import { dynamicLocalization } from 'utils/Translate/dynamicLocalization'

export const categoryEditForm = [
	{
		name: 'icon',
		label: 'icon',
		type: 'file',
		placeholder: 'icon',
		required: true,
	},
	{
		name: 'image',
		label: 'thumbnail',
		type: 'file',
		placeholder: 'thumbnail',
		required: true,
	},
	{
		name: 'name',
		label: 'name',
		type: 'text',
		placeholder: 'name',
		required: true,
	},
	{
		name: 'description',
		label: 'description',
		type: 'text',
		placeholder: 'description',
		required: true,
	},
	{
		name: 'attributes_search',
		label: '',
		type: 'text',
		placeholder: '',
		required: false,
	},

	{
		name: 'tax',
		label: 'tax',
		type: 'number',
		placeholder: 'tax',
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
		name: 'image',
		label: 'image',
		type: 'file',
		placeholder: 'Upload image',
		required: true,
	},
	{
		name: 'name',
		label: 'name',
		type: 'text',
		placeholder: 'Enter name',
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

export const attributeEditForm = [
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

export const pageEditForm = [
	{
		name: 'image',
		label: 'image',
		type: 'file',
		placeholder: 'image',
	},
	{
		name: 'title',
		label: 'title',
		type: 'text',
		placeholder: 'title',
		required: true,
		fullWidth: true,
	},
	{
		name: 'category_search',
		label: 'title',
		type: 'text',
		placeholder: 'title',
		required: false,
		fullWidth: true,
	},
	{
		name: 'content',
		label: 'content',
		type: 'textEditor',
		placeholder: 'Enter content',
		fullWidth: true,
	},
]

export const pageCategoryEditForm = [
	{
		name: 'title',
		label: 'title',
		type: 'text',
		placeholder: 'title',
		required: true,
	},
]

export const userEditForm = [
	{
		name: 'avatar',
		label: 'avatar',
		type: 'file',
		placeholder: 'avatar',
		required: false,
	},
	{
		name: 'firstName',
		label: 'firstName',
		type: 'text',
		placeholder: 'firstName',
		required: true,
	},
	{
		name: 'lastName',
		label: 'lastName',
		type: 'text',
		placeholder: 'lastName',
		required: false,
	},
	{
		name: 'email',
		label: 'email',
		type: 'email',
		placeholder: 'email',
		required: true,
	},
	{
		name: 'phone',
		label: 'phone',
		type: 'text',
		placeholder: 'phone',
		required: true,
	},

	{
		name: 'password',
		label: 'password',
		type: 'text',
		placeholder: 'password',
		required: false,
	},
]

export const siteSettingsFormEdit = [
	{
		name: 'email',
		label: 'email',
		type: 'text',
		placeholder: 'mail',
		required: true,
	},
	{
		name: 'support_email',
		label: 'support email',
		type: 'text',
		placeholder: 'support email',
		required: true,
	},
	{
		name: 'header_phone',
		label: 'header phone',
		type: 'text',
		placeholder: 'Enter Header phone',
		required: true,
	},
	{
		name: 'footer_phone',
		label: 'footer phone',
		type: 'text',
		placeholder: 'Enter footer phone',
		required: true,
	},
	{
		name: 'short_description',
		label: 'description',
		type: 'text-multiline',
		placeholder: 'description',
		required: true,
		fullWidth: true,
	},
	{
		name: 'address',
		label: 'address',
		type: 'text',
		placeholder: 'address',
		required: true,
		fullWidth: true,
	},
	{
		name: 'facebook',
		label: 'facebook link',
		type: 'text',
		placeholder: 'facebook',
		required: true,
	},
	{
		name: 'twitter',
		label: 'twitter link',
		type: 'text',
		placeholder: 'twitter',
		required: true,
	},
	{
		name: 'youtube',
		label: 'youtube link',
		type: 'text',
		placeholder: 'youtube',
		required: true,
	},
	{
		name: 'gmail',
		label: 'gmail link',
		type: 'text',
		placeholder: 'gmail',
		required: true,
	},
	{
		name: 'instagram',
		label: 'instagram link',
		type: 'text',
		placeholder: 'instagram',
		required: true,
	},
	{
		name: 'map',
		label: 'map',
		type: 'text',
		required: true,
	},
	{
		name: 'logo',
		label: 'logo',
		type: 'file',
		required: true,
	},
]

export const productVariantFormCreate = [
	{
		name: 'thumbnail',
		label: 'thumbnail',
		type: 'file',
		placeholder: 'thumbnail',
		required: true,
		fullWidth: true,
	},
	{
		name: 'price',
		label: 'price',
		type: 'number',
		placeholder: 'price',
		required: true,
	},
	{
		name: 'discount',
		label: 'discount',
		type: 'number',
		placeholder: 'discount',
		required: true,
	},
	{
		name: 'status',
		label: 'status',
		type: 'select',
		placeholder: 'status',
		allNames: [
			{
				id: 'available',
				name: dynamicLocalization(statusTranslation.available),
			},
			{
				id: 'unavailable',
				name: dynamicLocalization(statusTranslation.unavailable),
			},
		],
		required: true,
	},
	{
		name: 'stock',
		label: 'stock',
		type: 'number',
		placeholder: 'Enter stock',
		required: true,
	},
]

export const paymentFormCreate: {
	name: keyof IPayment
	label: string
	type: string
	placeholder: string
	required: boolean
}[] = [
	{
		name: 'payment_type',
		label: 'payment type',
		type: 'select',
		placeholder: 'payment type',
		required: true,
	},
	{
		name: 'bank_account',
		label: 'bank account',
		type: 'text',
		placeholder: 'bank account',
		required: true,
	},
	{
		name: 'phone_number',
		label: 'phone number',
		type: 'text',
		placeholder: 'phone number',
		required: true,
	},
	{
		name: 'confirm_photo',
		label: 'confirm photo',
		type: 'file',
		placeholder: 'confirm photo',
		required: true,
	},
]

export const ShopCreateForm: {
	name: keyof IShopForm
	label: string
	type: string
	fileTypes?: string
	placeholder: string
	required: boolean
}[] = [
	{
		name: 'owner',
		label: 'owner',
		type: 'text',
		placeholder: 'owner',
		required: true,
	},
	{
		name: 'shop_name',
		label: 'shop',
		type: 'text',
		placeholder: 'shop',
		required: true,
	},
	{
		name: 'short_name',
		label: 'shortName',
		type: 'text',
		placeholder: 'shortName',
		required: true,
	},
	{
		name: 'full_name',
		label: 'fullName',
		type: 'text',
		placeholder: 'fullName',
		required: true,
	},
	{
		name: 'address',
		label: 'address',
		type: 'text',
		placeholder: 'address',
		required: true,
	},
	{
		name: 'INN',
		label: 'inn',
		type: 'text',
		placeholder: 'inn',
		required: true,
	},
	{
		name: 'bik',
		label: 'bik',
		type: 'text',
		placeholder: 'bik',
		required: true,
	},
	{
		name: 'bank_account',
		label: 'bankAccount',
		type: 'text',
		placeholder: 'bankAccount',
		required: true,
	},
	{
		name: 'document',
		label: 'document',
		type: 'file',
		fileTypes: 'application/pdf',
		placeholder: 'document',
		required: true,
	},
]
