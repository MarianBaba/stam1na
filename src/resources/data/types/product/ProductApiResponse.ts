import { Product } from '@resources/data/types/product/Product';

export type ProductsGetResponse = {
  products: Product[];
};

export type ProductsPostResponse = {
  responseCode: number;
  message: string;
};

export type SearchProductsResponse = {
  responseCode: number;
  products: Product[];
};
