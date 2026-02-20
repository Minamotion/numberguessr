export default class Save {
	constructor(prefix) {
		this.prefix = prefix
	}

	set(k, v) {
		localStorage.setItem(`${this.prefix}/${k}`, JSON.stringify(v))
	}

	get(k, d = null) {
		const v = localStorage.getItem(`${this.prefix}/${k}`)
		return JSON.parse(v) ?? d
	}

	clear() {
		for (let i = localStorage.length -1; i >= 0; i--) {
			let k = localStorage.key(i)
			if (k.startsWith(`${this.prefix}/`)) {
				localStorage.removeItem(k)
			}
		}
	}
}