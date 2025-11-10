import { expect, test } from '@playwright/test';
import { BrandsApi } from '@resources/api/BrandsApi';
import { BrandsGetResponse, BrandsPutResponse } from '@resources/data/types/brand/BrandApiResponse';

test.describe('Product Brands API', () => {
  test('getAllBrands @smoke @no-regression @api @brands', async ({ request }) => {
    const brandsApi = new BrandsApi(request);
    const data: BrandsGetResponse = await brandsApi.getAllBrands();

    expect(data).toHaveProperty('brands');
    expect(Array.isArray(data.brands)).toBe(true);
    expect(data.brands.length).toBeGreaterThan(0);

    data.brands.forEach((product) => {
      expect(typeof product.id).toBe('number');
      expect(typeof product.brand).toBe('string');
      expect(product.brand.length).toBeGreaterThan(0);
    });
  });

  test('postToBrandsEndpoint @api @negative @brands', async ({ request }) => {
    const brandsApi = new BrandsApi(request);
    const response: BrandsPutResponse = await brandsApi.putToBrandsEndpoint();

    expect(response.responseCode).toBe(405);
    expect(response.message).toContain('This request method is not supported');
  });
});
