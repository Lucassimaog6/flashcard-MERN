import { Request, Response } from 'express';
import Deck from '../models/Deck';

export default async (req: Request, res: Response) => {
	const deck_id = req.params.deck_id;
	const deletedDeck = await Deck.findByIdAndDelete(deck_id);
	res.json(deletedDeck);
};
