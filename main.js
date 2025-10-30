import NumbergessrGame from "./classes/numberguessr.js";
import Save from "./classes/save.js";
import text from "./classes/text.js";

document.addEventListener("DOMContentLoaded", () => {
	let save = new Save("numberguessr")
	let game
	let attempts = 5
	let level = 1
	
	const curLevelSpan = document.getElementById("curLevelSpan")
	const bstLevelSpan = document.getElementById("bstLevelSpan")
	const resetBtn = document.getElementById("resetBtn")

	const playBtn = document.getElementById("playBtn")

	const gameConfigDiv = document.getElementById("gameConfigDiv")
	const attemptsInpt = document.getElementById("attemptsInpt")
	const difficultySpan = document.getElementById("difficultySpan")

	const gameDiv = document.getElementById("gameDiv")
	const minSpan = document.getElementById("minSpan")
	const maxSpan = document.getElementById("maxSpan")
	const messageP = document.getElementById("messageP")
	const guessInpt = document.getElementById("guessInpt")
	const submitGuessBtn = document.getElementById("submitGuessBtn")

	bstLevelSpan.innerText = `${save.get("bstLvl", 0)}`
	curLevelSpan.innerText = "0"

	resetBtn.addEventListener("click", () => {
		save.clear()
		location.reload()
	})

	attemptsInpt.addEventListener("change", () => {
		if (attemptsInpt.value < 1) {attemptsInpt.value = 1}
		if (attemptsInpt.value > 10) {attemptsInpt.value = 10}
		attemptsInpt.value = Math.floor(attemptsInpt.value)
		attempts = attemptsInpt.value
		if (attempts <= 2) {
			difficultySpan.innerText = "Literal gambling"
		} else if (attempts > 2 && attempts <= 4) {
			difficultySpan.innerText = "Hard"
		} else if (attempts > 4 && attempts <= 5) {
			difficultySpan.innerText = "Normal"
		} else if (attempts > 5 && attempts <= 8) {
			difficultySpan.innerText = "Easy"
		} else if (attempts > 8) {
			difficultySpan.innerText = "Literal baby"
		}
	})

	document.addEventListener("keypress", (e) => {
		if (e.key == "Enter") {
			e.preventDefault()
			if (game == null) {
				playBtn.click()
			} else {
				submitGuessBtn.click()
			}
		}
	});

	submitGuessBtn.addEventListener("click", () => {
		if (game == null) { return }
		game.guessNumber(+guessInpt.value, function () {
			// win
			messageP.innerText = text.win.replace("{guess}", guessInpt.value).replace("{answer}", game.answer)
			guessInpt.value = ""
			guessInpt.setAttribute("disabled", true)
			submitGuessBtn.setAttribute("disabled", true)
			curLevelSpan.innerText = `${++level}`
			playBtn.innerHTML = "Continue <kbd>Enter</kbd>"
			playBtn.removeAttribute("disabled")
			game = null
		}, function (msg) {
			// fail
			messageP.innerText = text[msg].replace("{guess}", guessInpt.value).replace("{attempts}", game.attempts).replace("{min}", game.min).replace("{max}", game.max) || `Error: No message associated with "${msg}"`
			guessInpt.value = ""
		}, function () {
			// lose
			messageP.innerText = text.lose.replace("{guess}", guessInpt.value).replace("{answer}", game.answer)
			if (level > +save.get("bstLvl", 0)) {
				save.set("bstLvl", level)
				bstLevelSpan.innerText = `${level}`
				curLevelSpan.innerText = "1"
				level = 1
			}
			guessInpt.value = ""
			guessInpt.setAttribute("disabled", true)
			submitGuessBtn.setAttribute("disabled", true)
			playBtn.innerHTML = "Play again <kbd>Enter</kbd>"
			playBtn.removeAttribute("disabled")
			game = null
		})
	})

	playBtn.addEventListener("click", () => {
		curLevelSpan.innerText = `${level}`
		playBtn.setAttribute("disabled", true)
		playBtn.innerText = "..."

		game = new NumbergessrGame(level, attempts)

		minSpan.innerText = `${game.min}`
		maxSpan.innerText = `${game.max}`
		guessInpt.setAttribute("min", game.min)
		guessInpt.setAttribute("max", game.max)

		messageP.innerText = `Type a number in the box below! (${game.attempts} attempts left)`

		guessInpt.value = ""
		guessInpt.removeAttribute("disabled")
		submitGuessBtn.removeAttribute("disabled")
		gameDiv.removeAttribute("hidden")
		gameConfigDiv.setAttribute("hidden", true)
		guessInpt.focus()
	})
})