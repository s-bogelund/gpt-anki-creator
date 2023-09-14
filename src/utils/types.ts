type BasicCard = {
	front: string;
	back: string;
};

type TaggedBasicCard = BasicCard & {
	tags: string[];
};
