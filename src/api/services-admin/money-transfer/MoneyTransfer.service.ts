import { CRUDservice } from './../../crud.service'
import { getMoneyTransferUrlAdmin } from 'src/config/api.config'

export const MoneyTransferService = CRUDservice(
	getMoneyTransferUrlAdmin,
	'MoneyTransfer admin'
)
