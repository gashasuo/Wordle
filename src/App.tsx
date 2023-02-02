import { useState } from "react";
import randomWords from "random-words";

import GuessedWords from "./components/GuessedWords";
import Keyboard from "./components/Keyboard";

function App() {
	//loop through random-words until we get 5 letter word
	let fiveLetterWord: string = "";
	while (fiveLetterWord.length < 5) {
		fiveLetterWord = randomWords({ exactly: 1, maxLength: 5 })[0].toUpperCase();
	}
	const [wordtoGuess, setWordToGuess] = useState(fiveLetterWord);
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const [guessedWords, setGuessedWords] = useState<string[]>([]);
	const [tries, setTries] = useState(0);

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

	return (
		<div>
			Number of tries: {tries}
			<p>{wordtoGuess}</p>
			<p>{guessedLetters}</p>
			<GuessedWords guessedWords={guessedWords} />
			<Keyboard
				guessedLetters={guessedLetters}
				addGuessedLetter={addGuessedLetter}
				removeGuessedLetter={removeGuessedLetter}
				resetGuessedLetters={resetGuessedLetters}
				guessedWords={guessedWords}
				addGuessedWord={addGuessedWord}
				addTries={addTries}
			/>
		</div>
	);
}

export default App;
