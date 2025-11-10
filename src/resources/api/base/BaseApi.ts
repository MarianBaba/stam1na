import { APIRequestContext, expect } from '@playwright/test';
import { step } from '@decorators/step';
import config from '@config';
import { log } from '@utils/logger';
import { ProductsPostResponse } from '@resources/data/types/product/ProductApiResponse';

export class BaseApi {
  constructor(protected request: APIRequestContext) {}

  @step()
  protected async get<T>(endpoint: string): Promise<T> {
    log(`GET ${config.API_BASE_URL}${endpoint}`);
    const response = await this.request.get(`${config.API_BASE_URL}${endpoint}`);
    expect(response.status()).toBe(200);
    return (await response.json()) as T;
  }

  @step()
  protected async post<T>(endpoint: string, data?: unknown): Promise<ProductsPostResponse<T>> {
    log(`POST ${config.API_BASE_URL}${endpoint}`);
    const response = await this.request.post(`${config.API_BASE_URL}${endpoint}`, { data });
    const text = await response.text();
    let json: ProductsPostResponse<T>;
    try {
      json = JSON.parse(text) as ProductsPostResponse<T>;
    } catch {
      json = {
        responseCode: response.status(),
        message: text as unknown as T,
      };
    }
    return json;
  }
}
