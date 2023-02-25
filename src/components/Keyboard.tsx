import { useEffect, useState } from "react";

import "../css/keyboard.css";

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
	guessedLetters: string[];
	addGuessedLetter: Function;
	removeGuessedLetter: Function;
	resetGuessedLetters: Function;
	guessedWords: string[];
	addGuessedWord: Function;
	addTries: Function;
	compareWords: Function;
	alphabetClasses: AlphabetClasses;
	updateAlphabetClasses: Function;
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
					addGuessedWord(guessedWord);
					// for (let i = 0; i < guessedWord.length; i++) {
					// 	const letter = guessedWord[i];
					// 	const index = i;
					// 	updateAlphabetClasses(letter, index);
					// }

					if (!guessedWords.length) {
						guessedWords.map((word) => {
							word.split("").map((letter, index) => {
								const color = compareWords(letter, index);
								updateAlphabetClasses(letter, color);
							});
						});
					}

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
