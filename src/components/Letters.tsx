import "../css/letters.css";

import { AlphabetClasses } from "../types/Types";

type LetterProps = {
	letter: string;
	index: number;
	fiveLetterWord: string;
	compareWords: Function;
	alphabetClasses: AlphabetClasses;
	setAlphabetClasses: Function;
};

function Letters({
	letter,
	index,
	fiveLetterWord,
	compareWords,
	alphabetClasses,
	setAlphabetClasses,
}: LetterProps) {
	return (
		<span className={`${compareWords(letter, index)}`} key={index}>
			{letter}
		</span>
	);
}

export default Letters;
