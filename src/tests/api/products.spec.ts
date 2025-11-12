import { expect, test } from '@playwright/test';
import { ProductsApi } from '@resources/api/ProductsApi';
import { description } from 'allure-js-commons';
import {
  ProductsGetResponse,
  ProductsPostResponse,
  SearchProductsResponse,
} from '@resources/data/types/product/ProductApiResponse';

test.describe('Products API', () => {
  test('getAllProducts @smoke @no-regression @api @product', async ({ request }) => {
    await description(`
      Verifies that the /productsList API successfully returns a list of all available products.
      Ensures that each product contains valid attributes such as id, name, price, brand, and category.
      Also checks that the product list is not empty.
    `);
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
    await description(`
      Ensures that the /productsList API correctly handles unsupported HTTP methods.
      Sends a POST request to the endpoint (which only supports GET)
      and verifies that it returns a 405 error with a proper message.
    `);
    const productsApi = new ProductsApi(request);
    const response: ProductsPostResponse = await productsApi.postToProductsEndpoint();

    expect(response.responseCode).toBe(405);
    expect(response.message).toContain('This request method is not supported');
  });

  const productsToSearch = ['tshirt', 'top'];

  for (const product of productsToSearch) {
    test(`searchProducts${product} @smoke @no-regression @search @api @product`, async ({
      request,
    }) => {
      await description(`
        Validates that the /searchProduct API successfully returns results for the search keyword "${product}".
        Verifies that each returned product has valid attributes and that product IDs are unique.
      `);
      const productsApi = new ProductsApi(request);

      const response: SearchProductsResponse = await productsApi.searchProducts(product);

      expect(response).toBeTruthy();
      expect(response.responseCode).toBe(200);

      const products = response.products;
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);

      products.forEach((p) => {
        expect(typeof p.id).toBe('number');
        expect(typeof p.name).toBe('string');
        expect(typeof p.price).toBe('string');
        expect(p.price).toMatch(/^Rs\.\s*\d+/);
        expect(typeof p.brand).toBe('string');
        expect(p.brand.length).toBeGreaterThan(0);
        expect(p).toHaveProperty('category');
        expect(p.category).toHaveProperty('usertype');
        expect(p.category).toHaveProperty('category');
      });

      // data quality: unique ids
      const ids = products.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  }

  test('searchProductsInvalid @negative @search @api @product', async ({ request }) => {
    await description(`
      Ensures that the /searchProduct API properly handles invalid requests.
      Sends a POST request without the required 'search_product' parameter and
      expects a 400 response indicating a bad request.
    `);
    const productsApi = new ProductsApi(request);
    const response: SearchProductsResponse = await productsApi.searchProducts();
    expect(response.responseCode).toBe(400);
    expect(response.products).toBe(undefined);
  });
});
