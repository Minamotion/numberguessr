export default class Save {
	constructor(prefix) {
		this.prefix = prefix
	}

	set(k, v) {
		localStorage.setItem(`${this.prefix}/${k}`, v)
	}

	get(k, d) {
		return localStorage.getItem(`${this.prefix}/${k}`) || d
	}

	remove(k) {
		localStorage.removeItem(`${this.prefix}/${k}`)
	}

	clear() {
		for (let i = 0; i < localStorage.length; i++) {
			let k = localStorage.key(i)
			if (k.startsWith(`${this.prefix}/`)) {
				localStorage.removeItem(k)
			}
		}
	}
}