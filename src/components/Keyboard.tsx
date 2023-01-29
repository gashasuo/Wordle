import { useEffect } from "react";

const alphabet = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

type KeyboardProps = {
	guessedLetters: string[];
};

function Keyboard(props: KeyboardProps) {
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			setGuessedLetters();
		};

		document.addEventListener("keypress", handleKeyPress);

		return () => {
			document.removeEventListener("keypress", handleKeyPress);
		};
	}, []);

	return (
		<div>
			{alphabet.map((letter) => {
				return <button key={letter}>{letter}</button>;
			})}
			{props.guessedLetters}
		</div>
	);
}

export default Keyboard;
