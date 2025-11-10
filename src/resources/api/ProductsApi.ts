import { APIRequestContext } from '@playwright/test';
import { step } from '@decorators/step';
import { BaseApi } from '@resources/api/base/BaseApi';
import { ProductsGetResponse } from '@resources/data/types/product/ProductApiResponse';

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
    return await this.post<string>('/productsList', body);
  }
}
