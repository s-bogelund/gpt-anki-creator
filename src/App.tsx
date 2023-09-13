import { useMemo, useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';

function App() {
	const [cardSourceState, setCardSourceState] = useState<string>(lorem);
	const [gptPromptState, setGptPromptState] = useState<string>(promptIntro);

	const prompt = useMemo(() => {
		return `${gptPromptState} ${cardSourceState}`;
	}, [gptPromptState, cardSourceState]);

	//TODO: SETUP A WAY FOR THE USER TO COPY THE PROMPT FOR CHAT GPT
	//TODO: ADD ANOTHER TEXTAREA FOR THE USER TO PASTE THE GPT OUTPUT INTO
	//TODO: ADD A BUTTON TO GENERATE THE FLASHCARDS FROM THE GPT OUTPUT VIA POST - REMEMBER TOAST FOR FEEDBACK
	//TODO: ADD A WAY TO CHANGE THE URI BUT HAVE localhost:8765 AS THE DEFAULT WITH AN EXPLANATION AS TO WHY

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="flex flex-col justify-center items-center min-h-[100vh] h-screen w-screen overflow-auto">
				<Card className="flex flex-col justify-start items-center py-12 min-h-[50%] w-[50%] gap-4">
					<Input
						className="w-96 resize"
						type="text"
						placeholder="Prompt or something"
					/>

					<div className="grid w-[70%] gap-1.5 place-items-center ">
						<Label htmlFor="flashcardSource" className="place-self-start">
							Source for flashcards
						</Label>
						<Textarea
							value={cardSourceState}
							id="flashcardSource"
							onChange={v => setCardSourceState(v.target.value)}
							className="w-full min-h-[200px] max-h-[600px] resize overflow-auto"
							placeholder="Add flashcard content here"
						/>
					</div>
					{/* <p>{prompt}</p> */}
				</Card>
			</div>
		</ThemeProvider>
	);
}

export default App;

const lorem =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const promptIntro = `You are a professional making flash cards from given text for educational purposes for schools, universities, professional trainings.
Create as many flash cards as needed following these rules:

- No duplicate cards!.
- Only provide the json for the flash cards, do not say anything else in the text, the text will be ignored.
- questions should have all the context necessary for answering it, (not "What was this period called?" but instead "What was the name of the period between 1939 and 1945?") because the flash cards will have no other context than the question.
- Make global questions about the text when it makes sense
- Don't invent anything, only use the text provided
- Write in {language}
`;
