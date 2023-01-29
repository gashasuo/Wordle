import { useState } from "react";
import randomWords from "random-words";

import GuessedWords from "./components/GuessedWords";
import Keyboard from "./components/Keyboard";

function App() {
	//loop through random-words until we get 5 letter word
	let fiveLetterWord: string = "";
	while (fiveLetterWord.length < 5) {
		fiveLetterWord = randomWords({ exactly: 1, maxLength: 5 })[0];
	}
	const [wordtoGuess, setWordToGuess] = useState(fiveLetterWord);
	const [guessedLetters, setGuessedLetters]: string[] = useState([]);

	return (
		<div>
			{wordtoGuess}

			<GuessedWords />
			<Keyboard />
		</div>
	);
}

export default App;
