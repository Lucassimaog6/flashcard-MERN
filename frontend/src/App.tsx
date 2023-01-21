import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import createDeck from './api/createDeck';
import { deleteDeck } from './api/deleteDeck';
import getDecks from './api/getDecks';

type Deck = {
	title: string;
	_id: string;
};

function App() {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [deckTitle, setDeckTitle] = useState('');

	useEffect(() => {
		(async () => {
			setDecks(await getDecks());
		})();
	}, []);

	const CreateDeck = async (e: React.FormEvent) => {
		e.preventDefault();
		const deck = await createDeck(deckTitle);
		setDecks([...decks, deck]);
		setDeckTitle('');
	};

	const DeleteDeck = async (deck_id: string) => {
		await deleteDeck(deck_id);
		setDecks(decks.filter((deck) => deck._id !== deck_id));
	};

	return (
		<>
			<div className='decks'>
				{decks.map((deck) => (
					<div key={deck._id}>
						<Link to={`decks/${deck._id}`}>{deck.title} </Link>
						<button onClick={() => DeleteDeck(deck._id)}>Delete</button>
					</div>
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
