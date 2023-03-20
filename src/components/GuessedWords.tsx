import Letters from "./Letters";

import { AlphabetClasses } from "../types/Types";

type GuessedWordsProps = {
	guessedWords: string[];
	fiveLetterWord: string;
	compareWords: (letter: string, index: number) => string;
	alphabetClasses: AlphabetClasses;
	setAlphabetClasses: Function;
};

function GuessedWords({
	guessedWords,
	fiveLetterWord,
	compareWords,
	alphabetClasses,
	setAlphabetClasses,
}: GuessedWordsProps) {
	return (
		<div className="guessedWords">
			{guessedWords
				? guessedWords.map((word, index) => (
						<p className="spansContainer" key={index}>
							{word.split("").map((letter: string, index: number) => (
								<Letters index={index} letter={letter} compareWords={compareWords} />
							))}
						</p>
				  ))
				: null}
		</div>
	);
}

export default GuessedWords;
