import { useEffect, useState } from "react";

import { AlphabetClasses } from "../types/Types";

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
	setErrorMessage: Function;
	guessedLetters: string[];
	addGuessedLetter: (letter: string) => void;
	removeGuessedLetter: () => void;
	resetGuessedLetters: () => void;
	guessedWords: string[];
	isRealWord: (word: string) => boolean;
	addGuessedWord: (word: string) => void;
	addTries: () => void;
	compareWords: (letter: string, index: number) => string;
	alphabetClasses: AlphabetClasses;
	updateAlphabetClasses: (letter: string, color: string) => void;
	determineWin: () => void;
	win: boolean | null;
};

function Keyboard({
	setErrorMessage,
	addGuessedLetter,
	guessedLetters,
	removeGuessedLetter,
	resetGuessedLetters,
	isRealWord,
	addGuessedWord,
	addTries,
	compareWords,
	alphabetClasses,
	updateAlphabetClasses,
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
					let guessedWord = guessedLetters.join("");
					if (!isRealWord(guessedWord)) {
						setErrorMessage("That's not a valid word");
						return;
					}
					//add guessedWord to array of guessedWords
					addGuessedWord(guessedWord);

					//code below now seems unnecessary
					// -----------------------------
					// if (!guessedWords.length) {
					// 	guessedWords.map((word) => {
					// 		word.split("").map((letter, index) => {
					// 			const color = compareWords(letter, index);
					// 			updateAlphabetClasses(letter, color);
					// 		});
					// 	});
					// }

					//updates keyboard to match letters on guesses
					guessedWord.split("").map((letter, index) => {
						const color = compareWords(letter, index);
						updateAlphabetClasses(letter, color);
					});

					resetGuessedLetters();
					addTries();
					determineWin();
				}
			}
			if ((e.key == "Backspace" || e.key == "Delete") && guessedLetters.length) {
				removeGuessedLetter();
				setErrorMessage(null);
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
							let guessedWord = guessedLetters.join("");
							if (!isRealWord(guessedWord)) {
								setErrorMessage("That's not a valid word");
								return;
							}
							addGuessedWord(guessedWord);

							// if (!guessedWords.length) {
							// 	guessedWords.map((word) => {
							// 		word.split("").map((letter, index) => {
							// 			const color = compareWords(letter, index);
							// 			updateAlphabetClasses(letter, color);
							// 		});
							// 	});
							// }

							guessedWord.split("").map((letter, index) => {
								const color = compareWords(letter, index);
								updateAlphabetClasses(letter, color);
							});

							resetGuessedLetters();
							addTries();
							determineWin();
						}
					}

					if (letter == "Backspace" && guessedLetters.length) {
						removeGuessedLetter();
						setErrorMessage(null);
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
					<button
						className={alphabetClasses[letter as keyof AlphabetClasses]}
						onClick={handleClick}
						key={letter}
					>
						{letter}
					</button>
				);
			})}
		</div>
	);
}

export default Keyboard;
