export default {
	"src/**/*.{ts,tsx,json,scss,css}": [()=>"pnpm eslint:fix",()=>"pnpm check-types",()=>"pnpm format"],
	"src/libraries/layerUtil/*": [()=>"pnpm test"]
};