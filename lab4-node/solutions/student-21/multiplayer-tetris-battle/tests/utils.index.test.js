import { describe, test, expect } from '@jest/globals';
import * as utils from '../src/utils/index.js';

describe('Utils Barrel File (src/utils/index.js)', () => {
  test('should correctly export functions from other utils files', () => {
    expect(utils.getRandomTetromino).toBeDefined();
    
    expect(typeof utils.getRandomTetromino).toBe('function');
  });
});