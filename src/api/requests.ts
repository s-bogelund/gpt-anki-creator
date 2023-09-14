export async function addNotes(uri: string, deckName: string, cards: BasicCard[]) {
	const notes = cards.map(card => {
		return {
			deckName: deckName,
			modelName: 'Basic',
			fields: {
				Front: card.front,
				Back: card.back,
			},
		};
	});

	const data = {
		action: 'addNotes',
		version: 6,
		params: {
			notes: notes,
		},
	};

	try {
		const response = await fetch(uri, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const responseData = await response.json();
		console.log(responseData);
	} catch (error) {
		console.error(error);
	}
}
