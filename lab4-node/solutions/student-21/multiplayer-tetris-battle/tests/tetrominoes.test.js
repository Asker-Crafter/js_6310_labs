import { getRandomTetromino } from '../src/utils/index.js'; 
import { describe, test, expect } from '@jest/globals';

describe('Tetrominoes utility', () => {
  test('getRandomTetromino should return a non-empty string', () => {
    const result = getRandomTetromino();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('getRandomTetromino should return a string containing figure details', () => {
    const result = getRandomTetromino();
    expect(result).toMatch(/Фигура [IOTSZLJ]:\n```\n(.|\n)+\n```/);
  });
});