export default async (deckTitle: string) => {
	const res = await fetch('http://localhost:3000/decks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: deckTitle,
		}),
	});
	return res.json();
};
