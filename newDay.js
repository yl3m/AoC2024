import fs from 'fs';
import { exec } from 'child_process';

const folderName = process.argv[2];

if (!folderName) {
	console.error('Please provide a folder name as a command-line argument.');
	process.exit(1);
}

fs.mkdirSync(folderName);

const files = ['index.js', 'input.txt'];

const boilerPlate = `import { getInput } from "../getInput.js";

const solve = ()=>{
    const data = getInput()
    console.log(data)
}

const result = solve()
console.log(result)`;

fs.writeFileSync(`${folderName}/${files[0]}`, boilerPlate);
fs.writeFileSync(`${folderName}/${files[1]}`, '');

exec(`cd ${folderName} && npm init -y; npm pkg set type="module"`, (error, stdout, stderr) => {
	if (error) {
		console.error(`Error running npm init: ${error.message}`);
		return;
	}
});
