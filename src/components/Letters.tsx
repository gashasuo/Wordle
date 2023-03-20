type LetterProps = {
	letter: string;
	index: number;
	compareWords: (letter: string, index: number) => string;
};

function Letters({ letter, index, compareWords }: LetterProps) {
	return (
		<span className={`${compareWords(letter, index)}`} key={index}>
			{letter}
		</span>
	);
}

export default Letters;
