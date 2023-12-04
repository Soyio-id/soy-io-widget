// src/sum.test.ts
import { test, expect } from 'vitest';
import sum from '../src/sum';

test('sums two numbers', () => {
  expect(sum(4, 7)).toBe(11);
});