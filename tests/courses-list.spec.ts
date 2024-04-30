import { test, expect } from '@playwright/test';

test('create delete course list', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Название').click();
  await page.getByPlaceholder('Название').fill('Test title');
  await page.getByPlaceholder('Описание').click();
  await page.getByPlaceholder('Описание').fill('Test desc');
  await page.getByRole('button', { name: 'Добавить' }).click();
  await expect(page.getByText('Test titleTest descУдалить')).toBeVisible();

  await page.getByRole('button', { name: 'Удалить' }).click();

  await expect(page.getByText('Test titleTest descУдалить')).not.toBeVisible();
});