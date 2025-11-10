import { APIRequestContext } from '@playwright/test';
import { step } from '@decorators/step';
import { BaseApi } from '@resources/api/base/BaseApi';
import { BrandsGetResponse, BrandsPutResponse } from '@resources/data/types/brand/BrandApiResponse';

export class BrandsApi extends BaseApi {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  @step()
  async getAllBrands() {
    return await this.get<BrandsGetResponse>('/brandsList');
  }

  @step()
  async putToBrandsEndpoint(body?: unknown) {
    return await this.put<BrandsPutResponse>('/brandsList', body);
  }
}
