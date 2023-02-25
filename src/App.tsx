import { useState, useEffect } from "react";
import randomWords from "random-words";

import { AlphabetClasses } from "./types/Types";

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

	const alphClasses: AlphabetClasses = {
		a: undefined,
		b: undefined,
		c: undefined,
		d: undefined,
		e: undefined,
		f: undefined,
		g: undefined,
		h: undefined,
		i: undefined,
		j: undefined,
		k: undefined,
		l: undefined,
		m: undefined,
		n: undefined,
		o: undefined,
		p: undefined,
		q: undefined,
		r: undefined,
		s: undefined,
		t: undefined,
		u: undefined,
		v: undefined,
		w: undefined,
		x: undefined,
		y: undefined,
		z: undefined,
	};

	const [wordToGuess, setWordToGuess] = useState("");
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const [guessedWords, setGuessedWords] = useState<string[]>([]);
	const [tries, setTries] = useState(0);
	const [win, setWin] = useState<boolean | null>(null);
	const [alphabetClasses, setAlphabetClasses] = useState(alphClasses);

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

	function compareWords(letter: string, index: number): string {
		if (wordToGuess[index] === letter) {
			return "green";
		} else if (
			wordToGuess.indexOf(letter) !== -1 &&
			wordToGuess.indexOf(letter) !== index
		) {
			return "yellow";
		} else {
			return "red";
		}
	}

	function updateAlphabetClasses(letter: string, color: string) {
		return setAlphabetClasses((prev) => ({ ...prev, [letter]: color }));
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
		setAlphabetClasses(alphClasses);
	}

	return (
		<div>
			{win !== null ? <div>{win ? "You win!" : "You lose!"} </div> : <div></div>}
			{win !== null ? <button onClick={playAgain}>Play Again?</button> : <div></div>}
			{win !== null ? <div>{`The word was: ${wordToGuess}`} </div> : <div></div>}
			{wordToGuess}
			<p>Number of tries: {tries}</p>
			<GuessedWords
				guessedWords={guessedWords}
				fiveLetterWord={wordToGuess}
				compareWords={compareWords}
				alphabetClasses={alphabetClasses}
				setAlphabetClasses={setAlphabetClasses}
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
				compareWords={compareWords}
				alphabetClasses={alphabetClasses}
				updateAlphabetClasses={updateAlphabetClasses}
				determineWin={determineWin}
				win={win}
			/>
		</div>
	);
}
export default App;
