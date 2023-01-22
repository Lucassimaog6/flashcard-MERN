export default async (deck_id: string) => {
	const res = await fetch(`http://localhost:3000/decks/${deck_id}`);
	return res.json();
};
