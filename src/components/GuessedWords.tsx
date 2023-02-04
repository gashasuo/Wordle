import React from "react";
import "../css/GuessedWords.css";

type GuessedWordsProps = {
	guessedWords: string[];
};

function GuessedWords({ guessedWords }: GuessedWordsProps) {
	return (
		<div>
			{guessedWords.map((word) => (
				<p key={word}>
					{word
						.toString()
						.split("")
						.map((letter: string, index) => (
							<span key={index}>{letter}</span>
						))}
				</p>
			))}
		</div>
	);
}

export default GuessedWords;
