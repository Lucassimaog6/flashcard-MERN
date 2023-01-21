import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
config();
const app = express();

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());

import Deck from './models/Deck';

app.get('/decks', async (req: Request, res: Response) => {
	const decks = await Deck.find();
	res.json(decks);
});

app.post('/decks', async (req: Request, res: Response) => {
	const body = req.body;
	const newDeck = new Deck({
		title: body.title,
	});
	res.json(await newDeck.save());
});

const db = mongoose.connect(process.env.MONGO_URI!).then(() => app.listen(3000));
