const STORAGE_PREFIX = "DanSc";
const Storage = {
	get: (key: string): string | null => {
		return localStorage.getItem(`${STORAGE_PREFIX}_${key}`);
	},
	set: (key: string, data: string | object): void => {
		if (typeof data == 'object') {
			data = JSON.stringify(data);
		}
		localStorage.setItem(`${STORAGE_PREFIX}_${key}`, data);
	},
	remove: (key: string): void => {
		localStorage.removeItem(`${STORAGE_PREFIX}_${key}`);
	}
}
export default Storage;