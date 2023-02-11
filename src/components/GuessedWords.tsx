import Letters from "./Letters";

type GuessedWordsProps = {
	guessedWords: string[];
	fiveLetterWord: string;
};

function GuessedWords({ guessedWords, fiveLetterWord }: GuessedWordsProps) {
	return (
		<div>
			{guessedWords
				? guessedWords.map((word, index) => (
						<p key={index}>
							{word.split("").map((letter: string, index: number) => (
								<Letters fiveLetterWord={fiveLetterWord} index={index} letter={letter} />
							))}
						</p>
				  ))
				: null}
		</div>
	);
}

export default GuessedWords;
