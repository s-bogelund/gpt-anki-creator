import { useMemo, useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import LanguagePicker from './components/LanguagePicker';
import { Button } from './components/ui/button';
import { dummyInfo } from './utils/dummyData';
import { promptIntro } from './utils/helperFunctions';
import { addNotes } from './api/requests';
import { useToast } from './components/ui/use-toast';
import { Toaster } from './components/ui/toaster';

function App() {
	const [cardSourceState, setCardSourceState] = useState<string>(dummyInfo);
	const [languageState, setLanguageState] = useState<string>('english');
	const [buttonState, setButtonState] = useState<'default' | 'copied'>('default');
	const [uriState, setUriState] = useState<string | null>(null);
	const [jsonState, setJsonState] = useState<string>('');
	const [deckNameState, setDeckNameState] = useState<string>('');

	const { toast } = useToast();

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

	function convertJsonToBasicCards(json: string): BasicCard[] | false {
		if (json.length === 0) {
			toast({
				title: 'Error!',
				description: 'No content in JSON field.',
				variant: 'destructive',
				duration: 3000,
			});
			return false;
		}

		const data = JSON.parse(json);
		const cards: BasicCard[] = data.map((item: any) => {
			return {
				front: item.front,
				back: item.back,
			};
		});

		console.log(cards);

		return cards;
	}

	const generateCards = async () => {
		const cards = convertJsonToBasicCards(jsonState);
		const success = await addNotes(uriState, deckNameState, cards);

		if (success) {
			toast({
				title: 'Cards added!',
				description: 'Your cards have been added to your deck.',
				variant: 'success',
				duration: 5000,
			});
		} else {
			toast({
				title: 'Error!',
				description: 'There was an error adding your cards.',
				variant: 'destructive',
				duration: 5000,
			});
		}
	};

	//TODO: SETUP A WAY FOR THE USER TO COPY THE PROMPT FOR CHAT GPT
	//TODO: ADD ANOTHER TEXTAREA FOR THE USER TO PASTE THE GPT OUTPUT INTO
	//TODO: ADD A BUTTON TO GENERATE THE FLASHCARDS FROM THE GPT OUTPUT VIA POST - REMEMBER TOAST FOR FEEDBACK
	//TODO: ADD A WAY TO CHANGE THE URI BUT HAVE localhost:8765 AS THE DEFAULT WITH AN EXPLANATION AS TO WHY

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Toaster />
			<div className="flex flex-col justify-center items-center min-h-[100vh] w-screen lg:w-full overflow-auto">
				<Card className="flex flex-col justify-start items-center py-12 min-h-[50%] w-[95%] sm:w-[90%] md:w-[75%] lg:w-[50%] gap-4 my-8">
					<h1 className="text-3xl font-bold mb-2">GPT-ANKI Generator</h1>
					<div className="grid w-[70%] gap-1.5 place-items-center ">
						<Label htmlFor="languagePicker" className="place-self-start">
							Flashcard Language
						</Label>
						<LanguagePicker
							className="mb-6 place-self-start"
							onChange={value => setLanguageState(value)}
						/>
						<Label htmlFor="flashcardSource" className="place-self-start">
							Text to generate flashcards from
						</Label>
						<Textarea
							value={cardSourceState}
							id="flashcardSource"
							onChange={v => setCardSourceState(v.target.value)}
							className="w-full min-h-[200px] max-h-[600px] resize-y mb-4"
							placeholder="Add flashcard content here"
						/>
						<Button
							onClick={() => copyPromptToClipboard()}
							className={`w-64 mb-6 ${
								buttonState === 'copied' ? 'bg-green-500 focus:bg-green-500' : ''
							}`}
						>
							{buttonState === 'copied' ? 'Copied!' : 'Copy Prompt'}
						</Button>

						<Label htmlFor="jsonField" className="place-self-start">
							Paste flashcard JSON here
						</Label>
						<Textarea
							value={jsonState}
							id="jsonField"
							onChange={v => setJsonState(v.target.value)}
							className="w-full min-h-[200px] max-h-[600px] overflow-auto mb-6 resize-y"
							placeholder="Add flashcard content here"
						/>
						<div className="w-full flex flex-row justify-center items-center gap-8 mb-4">
							<div className="flex flex-col items-center">
								<Label className="font-normal mb-1" htmlFor="deckName">
									AnkiConnect URI
								</Label>
								<Input
									className="w-32 place-self-start"
									id="uriField"
									type="text"
									placeholder="localhost:8765"
									value={uriState?.toString()}
									onChange={v => {
										if (v.target.value.length > 0) setUriState(v.target.value);
										else setUriState('localhost:8765');
									}}
								/>
							</div>
							<div className="flex flex-col items-center">
								<Label htmlFor="deckName" className="font-normal mb-1">
									Name of your deck
								</Label>
								<Input
									className="w-32 resize place-self-start"
									id="deckName"
									type="text"
									placeholder="Deck Name"
									value={deckNameState}
									onChange={v => setDeckNameState(v.target.value)}
								/>
							</div>
						</div>
						<Button className="w-full" onClick={() => generateCards()}>
							Generate Cards
						</Button>
					</div>
				</Card>
			</div>
		</ThemeProvider>
	);
}

export default App;

const lorem =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
