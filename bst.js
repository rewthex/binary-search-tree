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

	insert(value, root = this.root) {
		if (root === null) {
			root = new Node(value);
			return;
		}
		if (root.data > value) {
			if (root.left === null) {
				root.left = new Node(value);
				return;
			} else {
				this.insert(value, root.left);
			}
		}
		if (root.data < value) {
			if (root.right === null) {
				root.right = new Node(value);
				return;
			} else {
				this.insert(value, root.right);
			}
		}
	}

	deleteItem(value, root = this.root) {}

	find(value, root = this.root) {
		if (root === null || root.data === value) return root;
		if (value > root.data) {
			return this.find(value, root.right);
		}
		if (value < root.data) {
			return this.find(value, root.left);
		}
	}

	levelOrder(callback) {
		if (this.root === null) return;
		let queue = [this.root];
		while (queue.length > 0) {
			let current = queue.pop();
			callback(current);
			if (current.left) queue.unshift(current.left);
			if (current.right) queue.unshift(current.right);
		}
	}
}

const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6]);
const printNode = (node) => {
	console.log(node.data);
};
bst.levelOrder(printNode)
