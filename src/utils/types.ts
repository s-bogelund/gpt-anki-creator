type BasicCard = {
	front: string;
	back: string;
};

type TaggedBasicCard = BasicCard & {
	tags: string[];
};

type CardsCreatedResult = {
	result: number[];
	error: string | null;
};

type CardsCreatedMessage = {
	wasSuccessful: Boolean;
	message: string | null;
};
