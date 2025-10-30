export default class NumbergessrGame {
	constructor(level, attempts) {
		this.min = 1
		this.max = 4 +(2 *(level -1))
		this.answer = Math.floor(Math.random() *(this.max -this.min)) +this.min
		this.attempts = attempts
	}

	guessNumber(guess, win, fail, lose) {
		if (this.attempts > 0) {
			if (guess != this.answer) {
				if (Number.isNaN(guess) || typeof guess != "number") {
					return fail("isNaN")
				}
				if (guess < this.min) {
					return fail("lessThanMin")
				} else if (guess > this.max) {
					return fail("greaterThanMax")
				}
				this.attempts--
				if (this.attempts <= 0) {
					return lose()
				}
				if (guess < this.answer) {
					return fail("lessThanAnswer")
				} else if (guess > this.answer) {
					return fail("greaterThanAnswer")
				}
			} else {
				return win()
			}
		}
	}
}