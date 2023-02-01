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

	function addGuessedLetter(letter: string) {
		return setGuessedLetters((prev) => {
			const updated = [...prev, letter];
			console.log(updated);
			return updated;
		});
	}

	function removeGuessedLetter() {
		return setGuessedLetters((prev) => prev.slice(0, prev.length - 1));
	}

	function addGuessedWord(word: string) {
		return setGuessedWords((prev) => [...prev, word]);
	}

	return (
		<div>
			{wordtoGuess}
			{guessedLetters}
			<GuessedWords />
			<Keyboard
				guessedLetters={guessedLetters}
				addGuessedLetter={addGuessedLetter}
				guessedWords={guessedWords}
				addGuessedWord={addGuessedWord}
				removeGuessedLetter={removeGuessedLetter}
			/>
		</div>
	);
}

export default App;
