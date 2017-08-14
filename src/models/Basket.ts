import { Product } from './Product';

export class BasketModel
{
    basketId: number;
    customerId: number;
    lastUpdateDate: Date;
    basketItems: BasketItemModel[];

    BasketModel(){
        this.basketItems = [];
    }
}

export class BasketItemModel
{
    basketItemId: number;
    productId: number;
    product: Product;
    color: string;
    size: string;
    style: string;
    quantity: number;
    price: number;
    subTotal: number;
}

