import { Brand } from '@resources/data/types/brand/Brand';

export type BrandsGetResponse = {
  brands: Brand[];
};

export type BrandsPutResponse = {
  responseCode: number;
  message: string;
};
