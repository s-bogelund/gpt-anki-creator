import { useMemo, useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import LanguagePicker from './components/LanguagePicker';
import { Button } from './components/ui/button';
import { dummyInfo } from './utils/dummyData';

function App() {
	const [cardSourceState, setCardSourceState] = useState<string>(dummyInfo);
	const [languageState, setLanguageState] = useState<string>('english');
	const [buttonState, setButtonState] = useState<'default' | 'copied'>('default');
	const [uriState, setUriState] = useState<string>('localhost:8765');

	const prompt = useMemo(() => {
		console.log('prompt memo');

		return `${promptIntro(languageState)} ${cardSourceState}`;
	}, [cardSourceState, languageState]);

	const copyPromptToClipboard = () => {
		navigator.clipboard.writeText(prompt);
		setButtonState('copied');
		setTimeout(() => {
			setButtonState('default');
		}, 2000);
	};

	//TODO: SETUP A WAY FOR THE USER TO COPY THE PROMPT FOR CHAT GPT
	//TODO: ADD ANOTHER TEXTAREA FOR THE USER TO PASTE THE GPT OUTPUT INTO
	//TODO: ADD A BUTTON TO GENERATE THE FLASHCARDS FROM THE GPT OUTPUT VIA POST - REMEMBER TOAST FOR FEEDBACK
	//TODO: ADD A WAY TO CHANGE THE URI BUT HAVE localhost:8765 AS THE DEFAULT WITH AN EXPLANATION AS TO WHY

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="flex flex-col justify-center items-center min-h-[100vh] h-screen w-screen overflow-auto">
				<Card className="flex flex-col justify-start items-center py-12 min-h-[50%] w-[50%] gap-4">
					<LanguagePicker onChange={value => setLanguageState(value)} />

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

						<Button
							onClick={() => copyPromptToClipboard()}
							className={buttonState === 'copied' ? 'bg-green-500 focus:bg-green-500' : ''}
						>
							{buttonState === 'copied' ? 'Copied!' : 'Copy Prompt'}
						</Button>
						<Input
							className="w-96 resize"
							type="text"
							placeholder="localhost:8765"
							value={uriState}
							onChange={v => setUriState(v.target.value)}
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

function promptIntro(language: string = 'english') {
	return `You are a professional making flashcards from given text for educational purposes for schools, universities, professional trainings.
	Create as many flash cards as needed following these rules:
	
	- No duplicate cards!
	- Only provide the json for the flashcards, do not say anything else in the text, the text will be ignored.
	- questions should have all the context necessary for answering it, (not "What was this period called?" but instead "What was the name of the period between 1939 and 1945?") because the flash cards will have no other context than the question.
	- Answers should be fairly concise. This also means that you shoul avoid repeating a part of the question in the answer!
	- Make global questions about the text when it makes sense
	- Don't invent anything, only use the text provided
	- Write in ${language}

	If there's any text below this, you should create flashcards from it.

	`;
}
