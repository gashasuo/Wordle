import Letters from "./Letters";

import { AlphabetClasses } from "../types/Types";

type GuessedWordsProps = {
	guessedWords: string[];
	fiveLetterWord: string;
	compareWords: Function;
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
		<div>
			{guessedWords
				? guessedWords.map((word, index) => (
						<p key={index}>
							{word.split("").map((letter: string, index: number) => (
								<Letters
									fiveLetterWord={fiveLetterWord}
									index={index}
									letter={letter}
									compareWords={compareWords}
									alphabetClasses={alphabetClasses}
									setAlphabetClasses={setAlphabetClasses}
								/>
							))}
						</p>
				  ))
				: null}
		</div>
	);
}

export default GuessedWords;
