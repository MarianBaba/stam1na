import { APIRequestContext } from '@playwright/test';
import { step } from '@decorators/step';
import { BaseApi } from '@resources/api/base/BaseApi';
import {
  ProductsGetResponse,
  ProductsPostResponse,
  SearchProductsResponse,
} from '@resources/data/types/product/ProductApiResponse';

export class ProductsApi extends BaseApi {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  @step()
  async getAllProducts() {
    return await this.get<ProductsGetResponse>('/productsList');
  }

  @step()
  async postToProductsEndpoint(body?: unknown) {
    return await this.post<ProductsPostResponse>('/productsList', body);
  }

  @step()
  async searchProducts(search_product?: string) {
    if (search_product) {
      const params = new URLSearchParams();
      params.append('search_product', search_product);
      return await this.post<SearchProductsResponse>('/searchProduct', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
    } else {
      return await this.post<SearchProductsResponse>('/searchProduct');
    }
  }
}
