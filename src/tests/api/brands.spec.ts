import { expect, test } from '@playwright/test';
import { BrandsApi } from '@resources/api/BrandsApi';
import { description } from 'allure-js-commons';
import { BrandsGetResponse, BrandsPutResponse } from '@resources/data/types/brand/BrandApiResponse';

test.describe('Product Brands API', () => {
  test('getAllBrands @smoke @no-regression @api @brands', async ({ request }) => {
    await description(`
      Verifies that the /brandsList API correctly retrieves all available product brands.
      Ensures the response includes a valid 'brands' property containing an array of brand objects.
      Confirms that each brand has a numeric 'id' and a non-empty 'brand' name, and that the list is not empty.
    `);
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
    await description(`
      Ensures that the /brandsList API properly handles unsupported HTTP methods.
      Attempts to send a PUT request and verifies that the response returns a 405 status code
      along with a message indicating that the request method is not supported.
    `);
    const brandsApi = new BrandsApi(request);
    const response: BrandsPutResponse = await brandsApi.putToBrandsEndpoint();

    expect(response.responseCode).toBe(405);
    expect(response.message).toContain('This request method is not supported');
  });
});
