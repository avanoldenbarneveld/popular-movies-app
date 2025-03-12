require('@testing-library/jest-dom');

if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

globalThis.importMeta = {
  env: {
    VITE_TMDB_API_KEY: 'test-api-key'
  }
};
