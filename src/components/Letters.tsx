type LetterProps = {
	letter: string;
	index: number;
	compareWords: (letter: string, index: number) => string;
};

function Letters({ letter, index, compareWords }: LetterProps) {
	//takes each letter and runs compareWords in the className to determine what color it displays
	return (
		<span className={`${compareWords(letter, index)}`} key={index}>
			{letter}
		</span>
	);
}

export default Letters;
