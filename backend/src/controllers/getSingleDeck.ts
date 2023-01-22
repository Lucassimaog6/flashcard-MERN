import { Request, Response } from 'express';
import Deck from '../models/Deck';

export default async (req: Request, res: Response) => {
	const { deck_id } = req.params;
	const deck = await Deck.findById(deck_id);
	res.json(deck);
};
