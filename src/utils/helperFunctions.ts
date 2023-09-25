export function promptIntro(language: string = 'english') {
	return `You are a professional making flashcards from given text for educational purposes for schools, universities, professional trainings.
	Create as many flash cards as needed following these rules:

	- No duplicate cards!
	- Only provide the json for the flashcards, do not say anything else in the text, the text will be ignored.
	- The format should be as follows:
	{
		"front: "The question",
		"back": "The answer"
	}
	- It should be an array of objects in the above format
	- questions should have all the context necessary for answering it, (not "What was this period called?" but instead "What was the name of the period between 1939 and 1945?") because the flash cards will have no other context than the question.
	- Answers should be fairly concise - max 15 words but preferably less
	- You should avoid repeating a part of the question in the answer!
	- Make global questions about the text when it makes sense
	- Don't invent anything, only use the text provided
	- Write in ${language}

	If there's any text below this, you should create flashcards from it.

	`;
}

export function isCardsCreatedResult(obj: any): obj is CardsCreatedResult {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'result' in obj &&
		Array.isArray(obj.result) &&
		obj.result.every((item: any) => typeof item === 'number') &&
		'error' in obj &&
		(obj.error === null || typeof obj.error === 'string')
	);
}
