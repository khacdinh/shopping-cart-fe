export interface IProduct {
    id: number;
    author: string;
    description: string;
    image: string;
    price: number;
    title: string;
    quantity: number;
    toBuyQuantity: number;
}

export interface IOrder {
    customerId: number;
    recipientName: string;   
    shippingAddress: string;   
    recipientPhone: string;
    products: IProductDetail[]   
}

export interface IProductDetail {
    id: number;
    quantity: number
}
