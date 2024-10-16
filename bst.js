// Root node is middle element
// Root node of left subtree is middle node of left sub-array
// Root node of right subtree is middle node of right sub-array

export class Node {
	constructor(data) {
		this.data = data || null;
		this.left = null;
		this.right = null;
	}
}

export class BinarySearchTree {
	constructor(array) {
		this.root = this.buildTree(array, true);
	}

	buildTree(array, initialCall = false) {
		if (initialCall) {
			array = [...new Set(array)].sort((a, b) => a - b);
		}

		if (array.length === 0) return null;
		let mid = Math.floor(array.length / 2);
		let root = new Node(array[mid]);
		root.left = this.buildTree(array.slice(0, mid));
		root.right = this.buildTree(array.slice(mid + 1));
		return root;
	}
}

const bst = new BinarySearchTree([1, 2, 3, 4, 5]);
