import { CRUDservice } from './../../crud.service'
import { getMoneyTransferUrlAdmin } from 'config/api.config'

export const MoneyTransferService = CRUDservice(
	getMoneyTransferUrlAdmin,
	'MoneyTransfer admin'
)
