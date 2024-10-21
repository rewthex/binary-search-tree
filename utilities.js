export const createRandomNumbers = (amount = 100) => {
	const numbers = [];
	for (let i = 0; i < amount; i++) {
		numbers.push(Math.floor(Math.random() * 100));
	}
	return numbers;
};

export const printNodeData = (node) => {
	console.log(node.data);
};

export const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};
