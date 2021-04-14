import { ICustomOrder } from "./CustomOrder";
import { IDeliveryMethod } from "./deliveryMethod";

export interface ITenLastOrdersDTO{
    id: number;
    buyerEmail: string;
    subtotal: number;
    orderDate: string;
    shipToAddress: ShipToAddress;
    deliveryMethod: IDeliveryMethod;
    customOrderItems: ICustomOrder[];
    orderItems: IOrderItems[];
    status: string;

}
export interface ShipToAddress{
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postCode: string;
}
export interface IOrderItems {
        id: number;
        itemOrdered: IItemOrdered;
        quantity: number;
    }
export interface IItemOrdered {
        productItemId: number;
        productName: string;
        pictureUrl: string;
    }
