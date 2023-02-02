import React from "react";

type GuessedWordsProps = {
	guessedWords: string[];
};

function GuessedWords({ guessedWords }: GuessedWordsProps) {
	return (
		<div>
			{guessedWords.map((word) => (
				<p>{word}</p>
			))}
		</div>
	);
}

export default GuessedWords;
