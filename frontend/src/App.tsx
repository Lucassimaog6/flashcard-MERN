import React, { useEffect, useState } from 'react';

type Deck = {
	title: string;
	_id: string;
};

function App() {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [deckTitle, setDeckTitle] = useState('');

	useEffect(() => {
		fetch('http://localhost:3000/decks')
			.then((res) => res.json())
			.then((res) => setDecks(res));
	}, []);

	const CreateDeck = async (e: React.FormEvent) => {
		e.preventDefault();
		await fetch('http://localhost:3000/decks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: deckTitle,
			}),
		});
		setDeckTitle('');
	};

	return (
		<>
			<div className='decks'>
				{decks.map((deck) => (
					<li key={deck._id}>{deck.title}</li>
				))}
			</div>
			<form onSubmit={CreateDeck}>
				<label htmlFor='deck-title'>Título: </label>
				<input
					type='text'
					id='deck-title'
					value={deckTitle}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setDeckTitle(e.target.value);
					}}
				/>
				<button>Criar</button>
			</form>
		</>
	);
}

export default App;
