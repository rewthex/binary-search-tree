import { BinarySearchTree } from './bst.js';
import {
	createRandomNumbers,
	printNodeData,
	prettyPrint,
} from './utilities.js';

const initializeTree = (data) => {
	console.log('Creating the Binary Search Tree with random numbers...');
	const bst = new BinarySearchTree(data);
	prettyPrint(bst.root);
	return bst;
};

const checkBalance = (bst) => {
	console.log(`Tree is balanced: ${bst.isBalanced()}`);
};

const performInsertions = (bst, values) => {
	console.log(`Inserting values: ${values}`);
	values.forEach((value) => bst.insert(value));
	prettyPrint(bst.root);
};

const rebalanceTree = (bst) => {
	console.log('Rebalancing the tree...');
	bst.rebalance();
	prettyPrint(bst.root);
};

const performTraversals = (bst) => {
	console.log('Pre-Order Traversal:');
	bst.preOrder(printNodeData);

	console.log('\nIn-Order Traversal:');
	bst.inOrder(printNodeData);

	console.log('\nPost-Order Traversal:');
	bst.postOrder(printNodeData);
};

const run = () => {
	const randomNumbers = createRandomNumbers(100);
	const bst = initializeTree(randomNumbers);

	checkBalance(bst);
	performTraversals(bst);
	performInsertions(bst, [500, 700, 800, 900, 1000, 1100]);
	checkBalance(bst);
	rebalanceTree(bst);
	checkBalance(bst);
	performTraversals(bst);
};

run();
