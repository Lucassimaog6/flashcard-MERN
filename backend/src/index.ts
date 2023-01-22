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
import getDecks from './controllers/getDecks';
import createDeck from './controllers/createDeck';
import deleteDeck from './controllers/deleteDeck';
import createCard from './controllers/createCard';
import getSingleDeck from './controllers/getSingleDeck';
import deleteCard from './controllers/deleteCard';

app.get('/decks', getDecks);
app.post('/decks', createDeck);
app.delete('/decks/:deck_id', deleteDeck);

app.get('/decks/:deck_id', getSingleDeck);
app.post('/decks/:deck_id/cards', createCard);
app.delete('/decks/:deck_id/cards/:index', deleteCard);

const db = mongoose.connect(process.env.MONGO_URI!).then(() => app.listen(3000));
