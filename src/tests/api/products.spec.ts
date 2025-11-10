import { expect, test } from '@playwright/test';
import { ProductsApi } from '@resources/api/ProductsApi';
import {
  ProductsGetResponse,
  ProductsPostResponse,
} from '@resources/data/types/product/ProductApiResponse';

test.describe('Products API', () => {
  test('getAllProducts @smoke @no-regression @api @product', async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const data: ProductsGetResponse = await productsApi.getAllProducts();

    expect(data).toHaveProperty('products');
    expect(Array.isArray(data.products)).toBe(true);
    expect(data.products.length).toBeGreaterThan(0);

    data.products.forEach((product) => {
      expect(typeof product.id).toBe('number');
      expect(typeof product.name).toBe('string');
      expect(product.name.length).toBeGreaterThan(0);
      expect(typeof product.price).toBe('string');
      expect(typeof product.brand).toBe('string');
      expect(product.brand.length).toBeGreaterThan(0);
      expect(product.category).toHaveProperty('usertype');
      expect(product.category).toHaveProperty('category');
    });
  });

  test('postToProductsEndpoint @api @negative @product', async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response: ProductsPostResponse = await productsApi.postToProductsEndpoint();

    expect(response.responseCode).toBe(405);
    expect(response.message).toContain('This request method is not supported');
  });
});
