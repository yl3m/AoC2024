import { getInput } from '../getInput.js';

const solve = () => {
	const data = getInput();

	const left = data.map(x => +x.split('   ')[0]).sort();
	const right = data.map(x => +x.split('   ')[1]).sort();

	const r1 = left.reduce((t, c, i) => t + Math.abs(c - right[i]), 0);

	const r2 = left.reduce((t, c) => {
		let count = 0;
		for (let i = 0; i < right.length; i++) {
			if (right[i] === c) count++;
		}

		return t + c * count;
	}, 0);

	return [r1, r2];
};

const result = solve();
console.log(result);
