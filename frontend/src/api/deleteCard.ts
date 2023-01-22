import { DeckType } from '../App';

export default async (deck_id: string, index: number): Promise<DeckType> => {
	const res = await fetch(`http://localhost:3000/decks/${deck_id}/cards/${index}`, {
		method: 'DELETE',
	});
	return await res.json();
};
