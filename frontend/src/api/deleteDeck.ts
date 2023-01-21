export async function deleteDeck(deck_id: string) {
	const res = await fetch(`http://localhost:3000/decks/${deck_id}`, {
		method: 'DELETE',
	});
	return res.json();
}
