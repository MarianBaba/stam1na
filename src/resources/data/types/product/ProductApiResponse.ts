import { Product } from '@resources/data/types/product/Product';

export type ProductsGetResponse = {
  products: Product[];
};

export type ProductsPostResponse<T> = {
  responseCode: number;
  message: T;
};
