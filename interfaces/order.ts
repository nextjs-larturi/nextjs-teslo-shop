import { IUser, ISize } from "./";

export interface IOrder {
    _id?             : string;
    user?            : IUser | string;
    orderItems       : IOrdenItem[];
    shippingAddress  : ShippingAddress;
    paymentResult?   : string;
    numberOfItems    : number;
    subtotal         : number; 
    tax              : number; 
    total            : number;
    isPaid           : boolean;
    paidAt?          : string;
    transactionId?   : string;
}

export interface IOrdenItem {
    _id       : string;
    title     : string;
    size      : ISize;
    gender    : string;
    quantity  : number;
    slug      : string;
    image     : string;
    price     : number;
}

export interface ShippingAddress {
    firstName  : string;
    lastName   : string;
    address    : string;
    zip        : string;
    city       : string;
    country    : string;
    phone      : string;
 }