export default async (deck_id: string, text: string) => {
	const res = await fetch(`http://localhost:3000/decks/${deck_id}/cards`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text: text,
		}),
	});
	return res.json();
};
