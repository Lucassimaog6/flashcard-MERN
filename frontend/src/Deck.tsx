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
		<>
			<div className='cards'>
				{cards.map((card, index) => (
					<div key={index}>
						{card}
						<button onClick={() => DeleteCard(index)}>Delete</button>
					</div>
				))}
			</div>
			<form onSubmit={CreateCard}>
				<label htmlFor='card-title'>Cartão: </label>
				<input
					type='text'
					id='card-title'
					value={text}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setText(e.target.value);
					}}
				/>
				<button>Criar</button>
			</form>
		</>
	);
}
