export class Product
{
    productId: number;
    name: string;
    description: string;
    price: number;
    defaultColor: ProductColor;
    defaultStyle: ProductStyle;
    defaultSize: ProductSize;
    productColors: ProductColor[];
    productSizes: ProductSize[];
    productStyles: ProductStyle[];
}

export class ProductColor
{
    productColorId: number;
    name: string;
}

export class ProductSize
{
    productSizeId: number;
    name: string;
    sortIndex: number;
}

export class ProductStyle
{
    productStyleId: number;
    name: string;
    sortIndex: number;
}