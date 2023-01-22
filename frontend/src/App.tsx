import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import createDeck from './api/createDeck';
import deleteDeck from './api/deleteDeck';
import getDecks from './api/getDecks';

export type DeckType = {
	title: string;
	cards: string[];
	_id: string;
};

function App() {
	const [decks, setDecks] = useState<DeckType[]>([]);
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
		<main className='bg-slate-800 min-h-screen flex flex-col gap-10 justify-center items-center'>
			<div className='decks flex flex-wrap gap-10'>
				{decks.map((deck) => (
					<div
						key={deck._id}
						className='p-3 w-60 h-60 grid grid-rows-[30px_1fr_30px] place-items-center bg-slate-300 rounded hover:bg-slate-400 transition-all'>
						<button
							onClick={() => DeleteDeck(deck._id)}
							className='h-full p-2 rounded ml-auto hover:cursor-pointer hover:bg-black/30 transition-all'>
							<img src='https://emoji.aranja.com/static/emoji-data/img-twitter-72/274c.png' />
						</button>
						<Link to={`decks/${deck._id}`}>
							<h1 className='text-2xl p-10'>{deck.title}</h1>
						</Link>
					</div>
				))}
			</div>
			<form onSubmit={CreateDeck} className='bg-slate-600 flex items-center p-5 rounded gap-5'>
				<label htmlFor='deck-title'>Título: </label>
				<input
					type='text'
					id='deck-title'
					value={deckTitle}
					className='bg-black/20 py-1 px-2'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setDeckTitle(e.target.value);
					}}
				/>
				<button className='bg-slate-300 py-2 px-4 rounded hover:bg-slate-400 transition-all'>Criar</button>
			</form>
		</main>
	);
}

export default App;
