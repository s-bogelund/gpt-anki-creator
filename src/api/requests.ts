import { isCardsCreatedResult } from '@/utils/helperFunctions';

export async function addNotes(uri: string | null, deckName: string, cards: BasicCard[]) {
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
		const response = await fetch(`http://${uri ? uri : 'localhost:8765'}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const responseData = await response.json();
		if (isCardsCreatedResult(responseData)) {
			return true;
		} else {
			console.log('error:', responseData);
			return false;
		}
	} catch (error) {
		console.error(error);
		return error;
	}
}

function interpretResult(result: number[] | null[]) {
	let cardsCreated: number = 0;
	result.forEach(element => {
		if (element !== null) {
			cardsCreated++;
		}
	});

	if (cardsCreated !== result.length) {
		console.error('Not all cards were created');
	}
}
