export interface IMoneyTransfer {
    id: string,
    payment: string,
    amount: string,
    shop: {id: string, name: string}
    tax: string,
    confirm_photo: string
}