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

	deleteItem(value, root = this.root) {
		if (root === null) return root;

		// Traverse the tree
		if (value < root.data) {
			root.left = this.deleteItem(value, root.left);
		} else if (value > root.data) {
			root.right = this.deleteItem(value, root.right);
		} else {
			// Node found

			// Case 1: Node has no children
			if (root.left === null && root.right === null) return null;

			// Case 2: Node has one child
			if (root.left === null) {
				return root.right;
			} else if (root.right === null) {
				return root.left;
			}

			// Case 3: Node has two children
			let minRight = this.findMin(root.right);
			root.data = minRight.data;

			root.right = this.deleteItem(minRight.data, root.right);
		}

		return root;
	}

	findMin(root) {
		while (root.left !== null) {
			root = root.left;
		}
		return root;
	}

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

	preOrder(callback, root = this.root) {
		if (root === null) return;
		callback(root);
		this.preOrder(callback, root.left);
		this.preOrder(callback, root.right);
	}

	inOrder(callback, root = this.root) {
		if (root === null) return;
		this.inOrder(callback, root.left);
		callback(root);
		this.inOrder(callback, root.right);
	}

	postOrder(callback, root = this.root) {
		if (root === null) return;
		this.preOrder(callback, root.left);
		this.preOrder(callback, root.right);
		callback(root);
	}

	height(node) {
		if (node === null) return -1;
		return Math.max(this.height(node.left), this.height(node.right)) + 1;
	}

	depth(node, root = this.root, depth = 0) {
		if (root === null) return null;

		if (node.data === root.data) {
			return depth;
		}

		if (node.data > root.data) {
			return this.depth(node, root.right, depth + 1);
		} else {
			return this.depth(node, root.left, depth + 1);
		}
	}

	isBalanced(root = this.root) {
		let leftHeight = this.height(root.left);
		let rightHeight = this.height(root.right);
		return Math.abs(leftHeight - rightHeight) <= 1;
	}

	rebalance(data = [], root = this.root) {
		if (root === null) return;
		data.push(root.data);
		this.rebalance(data, root.left);
		this.rebalance(data, root.right);
		this.root = this.buildTree(data, true);
	}
}