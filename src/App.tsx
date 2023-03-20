import { useState, useEffect } from "react";
import randomWords from "random-words";
import fiveLetterWordList from "./fiveLetterWordList.json";

import "./css/app.css";

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
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	function addGuessedLetter(letter: string) {
		return setGuessedLetters((prev) => [...prev, letter]);
	}
	function removeGuessedLetter() {
		return setGuessedLetters((prev) => prev.slice(0, prev.length - 1));
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

	function isRealWord(word: string) {
		return fiveLetterWordList.includes(word.toLowerCase());
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
		<body>
			<div className="textDisplay">
				{errorMessage && <p>{errorMessage}</p>}
				<div>Number of tries: {tries}</div>
				{win !== null ? <div>{win ? "You win!" : "You lose!"} </div> : <div></div>}
				{win !== null ? <button onClick={playAgain}>Play Again?</button> : <div></div>}
				{win !== null ? <div>{`The word was: ${wordToGuess}`} </div> : <div></div>}
			</div>

			<div className="wordsContainer">
				<GuessedWords
					guessedWords={guessedWords}
					fiveLetterWord={wordToGuess}
					compareWords={compareWords}
					alphabetClasses={alphabetClasses}
					setAlphabetClasses={setAlphabetClasses}
				/>
				<p className="guessedLetters">
					{guessedLetters.map((letter: string) => (
						<span>{letter}</span>
					))}
				</p>
			</div>
			<Keyboard
				setErrorMessage={setErrorMessage}
				guessedLetters={guessedLetters}
				addGuessedLetter={addGuessedLetter}
				removeGuessedLetter={removeGuessedLetter}
				resetGuessedLetters={resetGuessedLetters}
				guessedWords={guessedWords}
				isRealWord={isRealWord}
				addGuessedWord={addGuessedWord}
				addTries={addTries}
				compareWords={compareWords}
				alphabetClasses={alphabetClasses}
				updateAlphabetClasses={updateAlphabetClasses}
				determineWin={determineWin}
				win={win}
			/>
		</body>
	);
}
export default App;
