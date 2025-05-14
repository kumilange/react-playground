import fs from 'fs';
import { data } from './filedata.js';

const parseFile = (files) => {
	// if is not folder, add contents instead of children
	const root = {
		name: 'root',
		path: '',
		isFolder: true,
		children: [],
	};

	files.forEach((file) => {
		let currentNode = root;
		const segments = file.path.split('/');
		const segmentsLength = segments.length;

		for (let i = 0; i < segmentsLength; i++) {
			const name = segments[i];
			const path = segments.slice(0, i + 1).join('/');
			const isFolder = i < segmentsLength - 1;

			let node = currentNode.children.find((child) => child.name === name);

			// children doesn't exist yet
			if (!node) {
				node = {
					name,
					path,
					isFolder,
					children: [],
				};
				currentNode.children.push(node);
			}

			// sort
			currentNode.children.sort((a, b) => {
				if (a.isFolder !== b.isFolder) {
					return a.isFolder ? -1 : 1;
				}
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
			});

			// if it's file
			if (!isFolder && i === segmentsLength - 1) {
				node.contents = file.contents;
			}

			// go to one level deep
			currentNode = node;
		}
	});

	return root;
};

const exportToJsonFile = (data, filename) => {
	// Convert the data object to a JSON string
	const jsonString = JSON.stringify(data, null, 2); // Pretty print with 2 spaces

	// Write the JSON string to a file
	fs.writeFile(filename, jsonString, (err) => {
		if (err) {
			console.error('Error writing to file', err);
		} else {
			console.log(`Data successfully written to ${filename}`);
		}
	});
};

const parsed = parseFile(data);
exportToJsonFile(parsed, 'parsedFileTree.json');
