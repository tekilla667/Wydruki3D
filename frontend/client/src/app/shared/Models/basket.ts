import { v4 as uuidv4 } from 'uuid';
import { ICustomOrder } from './CustomOrder';
import { IProduct } from './product';
export interface IBasket {
    id: string;
    basketItems: IBasketItem[];
    customOrderItems: ICustomOrder[];
}

export interface IBasketItem{
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    typeId: number;
}
export class BItem implements IProduct {
    id: number;
    name: string;
    price: number;
    typeId: number;
    description: string;
    pictureUrl: string;
    quantity: number;
}
export class Basket implements IBasket {
    id = uuidv4();
    basketItems: IBasketItem[] = [];
    customOrderItems: ICustomOrder[] = [];
}
export interface IBasketValue {
    price: number;
}
export class BasketValue implements IBasketValue {
    price = 0;
}
