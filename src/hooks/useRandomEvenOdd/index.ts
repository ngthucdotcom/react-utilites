import { useEffect, useState } from 'react';

export const useRandomEvenOdd = (initial: any) => {

	const { enableFlag } = initial;
	const [isEven, setIsEven] = useState(true);

	useEffect(() => {
		const switchEvenOdd = setInterval(() => {
			const randomNumber = Math.ceil(Math.random() * 1000 + 1);
			setIsEven(randomNumber % 2 === 0);
		}, 1500);

		if (!enableFlag) clearInterval(switchEvenOdd);

		return () => clearInterval(switchEvenOdd);
	}, [enableFlag]);

	return { isEven };
};
