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
	removeGuessedLetter: Function;
	resetGuessedLetters: Function;
	guessedWords: string[];
	addGuessedWord: Function;
	addTries: Function;
	determineWin: Function;
	win: boolean | null;
};

function Keyboard({
	addGuessedLetter,
	guessedLetters,
	removeGuessedLetter,
	resetGuessedLetters,
	guessedWords,
	addGuessedWord,
	addTries,
	determineWin,
	win,
}: KeyboardProps) {
	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (win !== null) {
				return;
			}
			if (e.key == "Enter") {
				if (guessedLetters.length == 5) {
					addGuessedWord(guessedLetters.join(""));
					resetGuessedLetters();
					addTries();
					determineWin();
				}
			}
			if ((e.key == "Backspace" || e.key == "Delete") && guessedLetters.length) {
				removeGuessedLetter();
			}

			const letterRegex = /^[a-z]$/;
			if (letterRegex.test(e.key)) {
				if (guessedLetters.length > 4) {
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
					if (win !== null) {
						return;
					}

					if (letter == "Enter") {
						if (guessedLetters.length == 5) {
							addGuessedWord(guessedLetters.join(""));
							resetGuessedLetters();
							addTries();
							determineWin();
						}
					}

					if (letter == "Backspace" && guessedLetters.length) {
						removeGuessedLetter();
					}

					const letterRegex = /^[A-Z]$/;

					if (letterRegex.test(letter)) {
						if (guessedLetters.length > 4) {
							return;
						}
						addGuessedLetter(letter);
					}
				}
				return (
					<button onClick={handleClick} key={letter}>
						{letter}
					</button>
				);
			})}
		</div>
	);
}

export default Keyboard;
