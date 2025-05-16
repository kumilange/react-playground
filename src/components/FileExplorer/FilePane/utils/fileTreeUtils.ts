import { File } from '../../Workspace/WorkspaceContext';

// Type definitions for file tree nodes
export interface TreeNode {
	name: string;
	path: string;
	isFolder: boolean;
	children: TreeNode[];
	contents?: string;
}

/**
 * Builds a nested file tree structure from a flat list of files
 * - Folders are created for directory paths
 * - Files with the same directory are grouped together
 * - Tree is sorted alphabetically with folders first
 */
export function buildFileTree(files: File[]): TreeNode {
	// Create root node
	const root: TreeNode = {
		name: 'root',
		path: '',
		isFolder: true,
		children: [],
	};

	// Process each file and add to tree
	files.forEach((file) => {
		const pathParts = file.path.split('/');
		let currentNode = root;

		// Process each path segment
		for (let i = 0; i < pathParts.length; i++) {
			const name = pathParts[i];
			const path = pathParts.slice(0, i + 1).join('/');
			const isFolder = i < pathParts.length - 1;

			// Look for existing node with this name
			let node = currentNode.children.find((child) => child.name === name);

			// Create node if it doesn't exist
			if (!node) {
				node = {
					name,
					path,
					isFolder,
					children: [],
				};
				currentNode.children.push(node);

				// Sort children after adding new node (folders first, then alphabetically)
				currentNode.children.sort((a, b) => {
					// Folders come before files
					if (a.isFolder !== b.isFolder) {
						return a.isFolder ? -1 : 1;
					}
					// Both are folders or both are files, sort alphabetically (case-insensitive)
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				});
			}

			// Add file contents to leaf node
			if (!isFolder && i === pathParts.length - 1) {
				node.contents = file.contents;
			}

			// Move to this node for next path segment
			currentNode = node;
		}
	});

	return root;
}
