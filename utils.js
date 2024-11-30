export function sum(a, i = 0) {
	if (Array.isArray(a)) {
		return a.reduce((t, c) => t + c, i);
	}
	throw new Error('sum needs to get an array');
}

export const getMatrix = data => {
	if (Array.isArray(data)) {
		return data.map(line => line.split(''));
	}
	throw new Error('getMatrix needs to get an array');
};

export const getMatrixWithValue = (rows, cols, value = false) => {
	return Array.from({ length: rows }, () => Array(cols).fill(value));
};

export const getSurroundings = (matrix, col, row, diagonals = false) => {
	const rows = matrix.length;
	const cols = matrix[0].length;
	const surroundingCells = [];

	const neighborsWithDiagonals = [
		[-1, -1, 'NW'],
		[-1, 0, 'N'],
		[-1, 1, 'SW'],
		[0, -1, 'W'],
		[0, 1, 'E'],
		[1, -1, 'NE'],
		[1, 0, 'S'],
		[1, 1, 'SE'],
	];

	const neighborsWithoutDiagonals = [
		[-1, 0, 'N'],
		[0, -1, 'W'],
		[0, 1, 'E'],
		[1, 0, 'S'],
	];

	const neighbors = diagonals ? neighborsWithDiagonals : neighborsWithoutDiagonals;

	for (const [dx, dy, dir] of neighbors) {
		const newX = col + dx;
		const newY = row + dy;

		if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
			surroundingCells.push({ row: newX, col: newY, value: matrix[newX][newY], dir });
		}
	}

	return surroundingCells;
};

export const getLineMatches = (regex, line) => {
	let match;
	const matches = [];

	while ((match = regex.exec(line)) !== null) {
		matches.push({ start: match.index, end: regex.lastIndex - 1, number: match[0] });
	}

	return matches;
};

export const isSymbol = char => {
	return isNaN(char) && char !== char;
};

export const getSurroundingsExt = ({ row, start, end, value }, matrix) => {
	const r = matrix.length;
	const c = matrix[0].length;
	const s = end - start + 1;
	const surroundingValues = [];
	const surroundingData = [];

	if (row > r || s > c) {
		throw new Error('Data does not fit matrix dimensions');
	}

	if (r !== c) {
		throw new Error('Matrix has different dimensions');
	}

	for (let j = row - 1; j <= row + 1; j++) {
		for (let i = start - 1; i <= end + 1; i++) {
			if (j >= 0 && j < r && i >= 0 && i < c) {
				if ((j === row && (i < start || i > end)) || j !== row) {
					surroundingValues.push(matrix[j][i]);
					surroundingData.push({ row: j, column: i, data: matrix[j][i], originalValue: value });
				}
			}
		}
	}

	return [surroundingValues, surroundingData];
};

// Get least common multiple (LCM) of an array of numbers
export const lcmFromArray = arr => arr.reduce(lcm, 1);

// Function to find the greatest common divisor (GCD) of two numbers
export const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// Function to find the least common multiple (LCM) of two numbers
export const lcm = (a, b) => (a * b) / gcd(a, b);
