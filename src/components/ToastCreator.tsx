import React, { FC } from 'react';
import { useToast } from './ui/use-toast';

type ToastCreatorProps = {
	variant: 'success' | 'error' | 'default';
	title: string;
	description: string;
	duration: number;
};

const ToastCreator: FC<ToastCreatorProps> = ({}) => {
	const { toast } = useToast();

	return (
		<div
			onClick={() =>
				toast({
					title: 'Cards added!',
					description: 'Your cards have been added to your deck.',
					variant: 'success',
					duration: 5000,
				})
			}
		>
			Toast
		</div>
	);
};

export default ToastCreator;
