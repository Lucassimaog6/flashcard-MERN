import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import createCard from './api/createCard';
import deleteCard from './api/deleteCard';
import getSingleDeck from './api/getSingleDeck';
import { DeckType } from './App';

export default function Deck() {
	const [deck, setDeck] = useState<DeckType>();
	const [cards, setCards] = useState<string[]>([]);
	const [text, setText] = useState('');
	const { deck_id } = useParams();

	useEffect(() => {
		if (!deck_id) return;
		(async () => {
			const newDeck = await getSingleDeck(deck_id);
			setDeck(newDeck);
			setCards(newDeck.cards);
		})();
	}, [deck_id]);

	const CreateCard = async (e: React.FormEvent) => {
		e.preventDefault();
		const { cards: serverCards } = await createCard(deck_id!, text);
		setCards(serverCards);
		setText('');
	};

	const DeleteCard = async (index: number) => {
		if (!deck_id) return;
		const newDeck = await deleteCard(deck_id, index);
		setCards(newDeck.cards);
	};
	return (
		<main className='bg-slate-800 min-h-screen flex flex-col gap-10 justify-center items-center'>
			<div className='cards flex flex-wrap gap-10'>
				{cards.map((card, index) => (
					<div
						key={index}
						className='p-3 w-60 h-60 grid grid-rows-[30px_1fr_30px] place-items-center bg-slate-300 rounded'>
						<button
							onClick={() => DeleteCard(index)}
							className='h-full p-2 rounded ml-auto hover:cursor-pointer hover:bg-black/30 transition-all'>
							<img src='https://emoji.aranja.com/static/emoji-data/img-twitter-72/274c.png' />
						</button>
						<p className='text-2xl p-10'>{card}</p>
					</div>
				))}
			</div>
			<form onSubmit={CreateCard} className='bg-slate-600 flex items-center p-5 rounded gap-5'>
				<label htmlFor='card-title'>Cartão: </label>
				<input
					type='text'
					id='card-title'
					value={text}
					className='bg-black/20 py-1 px-2'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setText(e.target.value);
					}}
				/>
				<button className='bg-slate-300 py-2 px-4 rounded hover:bg-slate-400 transition-all'>Criar</button>
			</form>
		</main>
	);
}
