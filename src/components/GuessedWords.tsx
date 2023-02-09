import React from "react";
import Letters from "./Letters";

type GuessedWordsProps = {
	guessedWords: string[];
	fiveLetterWord: string;
	addNumberCorrect: Function;
};

function GuessedWords({
	guessedWords,
	fiveLetterWord,
	addNumberCorrect,
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
									addNumberCorrect={addNumberCorrect}
								/>
							))}
						</p>
				  ))
				: null}
		</div>
	);
}

export default GuessedWords;
