import { describe, test, expect, jest } from '@jest/globals';

jest.unstable_mockModule('../src/bot.js', () => ({
  default: jest.fn(),
}));

describe('Application entry point', () => {
  test('should call runBot on startup', async () => {
    const { default: runBot } = await import('../src/bot.js');

    await import('../src/index.js');
    
    expect(runBot).toHaveBeenCalled();
  });
});