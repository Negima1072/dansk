export default {
	"src/**/*.{ts,tsx}": ["npm run eslint:fix",()=>"npm run check-types"],
	"src/**/*.{ts,tsx,json}": "npm run format"
};