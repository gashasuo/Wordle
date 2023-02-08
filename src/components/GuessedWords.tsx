import React from "react";
import Letters from "./Letters";

type GuessedWordsProps = {
	guessedWords: string[];
	fiveLetterWord: string;
};

function GuessedWords({ guessedWords, fiveLetterWord }: GuessedWordsProps) {
	return (
		<div>
			{guessedWords.map((word) => (
				<p key={word}>
					{word.split("").map((letter: string, index) => (
						<Letters fiveLetterWord={fiveLetterWord} index={index} letter={letter} />
					))}
				</p>
			))}
		</div>
	);
}

export default GuessedWords;

{
	/* .toString()
				.split("")
						.map((letter: string, index) => (
						<Letters fiveLetterWord={fiveLetterWord} index={index} letter={letter} />
						))}  */
}
