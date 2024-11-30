import fs from 'fs';

export function getInput() {
	try {
		const input = fs.readFileSync('input.txt', { encoding: 'utf-8' });
		return input.split('\n');
	} catch (e) {
		console.log(e);
	}
}
