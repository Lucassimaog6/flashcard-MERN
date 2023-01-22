import { Request, Response } from 'express';
import Deck from '../models/Deck';

export default async (req: Request, res: Response) => {
	const body = req.body;
	const newDeck = new Deck({
		title: body.title,
	});
	res.json(await newDeck.save());
};
