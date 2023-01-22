import { Request, Response } from 'express';
import Deck from '../models/Deck';

export default async (req: Request, res: Response) => {
	const deck_id = req.params.deck_id;
	const { text } = req.body;
	const deck = await Deck.findById(deck_id);
	if (!deck) return res.send('Deck não existe');
	deck.cards.push(text);
	await deck.save();
	res.json(deck);
};
