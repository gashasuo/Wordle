import "../css/letters.css";

type LetterProps = {
	letter: string;
	index: number;
	fiveLetterWord: string;
	addNumberCorrect: Function;
};

function Letters({ letter, index, fiveLetterWord, addNumberCorrect }: LetterProps) {
	function compareWords(letter: string, index: number): string {
		if (fiveLetterWord[index] === letter) {
			addNumberCorrect();
			return "green";
		} else if (
			fiveLetterWord.indexOf(letter) !== -1 &&
			fiveLetterWord.indexOf(letter) !== index
		) {
			return "yellow";
		} else {
			return "red";
		}
	}

	return (
		<span className={`${compareWords(letter, index)}`} key={index}>
			{letter}
		</span>
	);
}

export default Letters;
