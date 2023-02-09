import { useState, useEffect } from "react";
import randomWords from "random-words";

import GuessedWords from "./components/GuessedWords";
import Keyboard from "./components/Keyboard";

function App() {
	useEffect(() => {
		const generatedWord = generateTargetWord();
		setWordToGuess(generatedWord);
	}, []);

	//loop through random-words until we get 5 letter word
	function generateTargetWord() {
		let fiveLetterWord = "";
		while (fiveLetterWord.length < 5) {
			fiveLetterWord = randomWords({ exactly: 1, maxLength: 5 })[0].toUpperCase();
		}
		return fiveLetterWord;
	}
	const [wordToGuess, setWordToGuess] = useState("");
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const [guessedWords, setGuessedWords] = useState<string[]>([]);
	const [tries, setTries] = useState(0);
	const [win, setWin] = useState("");
	const [numberCorrect, setNumberCorrect] = useState(0);

	function addGuessedLetter(letter: string) {
		return setGuessedLetters((prev) => {
			const updated = [...prev, letter];
			console.log(updated);
			return updated;
		});
	}

	function removeGuessedLetter() {
		return setGuessedLetters((prev) => {
			const updated = prev.slice(0, prev.length - 1);
			console.log(updated);
			return updated;
		});
	}

	function resetGuessedLetters() {
		return setGuessedLetters([]);
	}

	function addGuessedWord(word: string) {
		return setGuessedWords((prev) => [...prev, word]);
	}

	function addTries() {
		return setTries((prev) => prev + 1);
	}

	function addNumberCorrect() {
		return setNumberCorrect((prev) => prev + 1);
	}

	function resetNumberCorrect() {
		return setNumberCorrect(0);
	}

	function determineWin() {
		if (tries == 6) {
			setWin("You lose!");
		}
		if (numberCorrect == 5) {
			setWin("You win!");
		}
	}

	return (
		<div>
			{win ? <div>{win} </div> : <div></div>}
			<p>Number of tries: {tries}</p>
			<p>{wordToGuess}</p>
			<GuessedWords
				guessedWords={guessedWords}
				fiveLetterWord={wordToGuess}
				addNumberCorrect={addNumberCorrect}
			/>
			<p>{guessedLetters}</p>
			<Keyboard
				guessedLetters={guessedLetters}
				addGuessedLetter={addGuessedLetter}
				removeGuessedLetter={removeGuessedLetter}
				resetGuessedLetters={resetGuessedLetters}
				guessedWords={guessedWords}
				addGuessedWord={addGuessedWord}
				addTries={addTries}
				determineWin={determineWin}
				resetNumberCorrect={resetNumberCorrect}
			/>
		</div>
	);
}
export default App;
