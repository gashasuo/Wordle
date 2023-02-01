import { useEffect } from "react";

const alphabet = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"Backspace",
	"Enter",
];

type KeyboardProps = {
	guessedLetters: string[];
	addGuessedLetter: Function;
	guessedWords: string[];
	addGuessedWord: Function;
	removeGuessedLetter: Function;
};

function Keyboard({
	addGuessedLetter,
	guessedLetters,
	guessedWords,
	addGuessedWord,
	removeGuessedLetter,
}: KeyboardProps) {
	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key == "Enter") {
				if (guessedLetters.length == 5) {
					addGuessedWord(guessedLetters);
				}
			}
			if (e.key == "Backspace" && guessedLetters.length) {
				removeGuessedLetter();
				console.log(guessedLetters);
			}
			const letterRegex = /^[a-z]$/;
			if (letterRegex.test(e.key)) {
				if (guessedLetters.length > 5) {
					e.preventDefault();
					return;
				}
				addGuessedLetter(e.key.toUpperCase());
			}
		};

		document.addEventListener("keydown", handleKeydown);

		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	}, [guessedLetters]);

	return (
		<div>
			{alphabet.map((letter) => {
				function handleClick() {
					if (letter == "Backspace" && guessedLetters.length) {
						removeGuessedLetter();
					}
					if (letter == "Enter") {
						if (guessedLetters.length == 5) {
							addGuessedWord(guessedLetters);
						}
					}
					if (guessedLetters.length > 5) {
						return;
					}
					addGuessedLetter(letter);
					console.log(guessedLetters);
				}
				return (
					<button onClick={handleClick} key={letter}>
						{letter}
					</button>
				);
			})}
			{guessedLetters}
		</div>
	);
}

export default Keyboard;
