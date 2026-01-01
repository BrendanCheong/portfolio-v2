import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder/TextDecoder for happy-dom
Object.assign(global, { TextEncoder, TextDecoder });

// Cleanup after each test
afterEach(() => {
  cleanup();
});
