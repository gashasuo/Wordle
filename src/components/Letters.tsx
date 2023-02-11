import "../css/letters.css";

type LetterProps = {
	letter: string;
	index: number;
	fiveLetterWord: string;
};

function Letters({ letter, index, fiveLetterWord }: LetterProps) {
	function compareWords(letter: string, index: number): string {
		if (fiveLetterWord[index] === letter) {
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
