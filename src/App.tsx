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
	const [win, setWin] = useState<boolean | null>(null);

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
	function determineWin() {
		if (tries == 5) {
			setWin(false);
		}
		if (guessedLetters.join("") == wordToGuess) {
			setWin(true);
		}
	}

	function playAgain() {
		const generatedWord = generateTargetWord();
		setWordToGuess(generatedWord);
		setGuessedLetters([]);
		setGuessedWords([]);
		setTries(0);
		setWin(null);
	}

	return (
		<div>
			{win !== null ? <div>{win ? "You win!" : "You lose!"} </div> : <div></div>}
			{win !== null ? <button onClick={playAgain}>Play Again?</button> : <div></div>}
			{win !== null ? <div>{`The word was: ${wordToGuess}`} </div> : <div></div>}
			<p>Number of tries: {tries}</p>
			<GuessedWords guessedWords={guessedWords} fiveLetterWord={wordToGuess} />
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
				win={win}
			/>
		</div>
	);
}
export default App;
