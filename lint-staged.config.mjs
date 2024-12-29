export default {
  "src/**/*.{ts,tsx,json,scss,css}": [() => "pnpm lint", , () => "pnpm format"],
  "src/libraries/layerUtil/*": [() => "pnpm test"],
};
