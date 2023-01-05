// The task is to write a function that takes two arguments N and M and returns a string of the form "ab+c+...z", where the sum of the numbers is M, and the numbers are 1, 2, 3, ..., N.
// The string should contain only numbers and + signs in the right places. If there is no solution, return the line "No solution".

// Examples:

// 2)Input: N=4 M=46
// Output: '12+34'=46

function findMofN(N, M) {
	let numbers = Array.from({ length: N }, (_, i) => (i + 1).toString())

	let lastTry = []

	for (let i = 0; i < numbers.length; i++) {
		let result = [...numbers]

		result.splice(i + 1, 0, '+')
		if (eval(result.join('')) === M) {
			return result.join('')
		} else {
			if (eval(lastTry.join('')) == M) return lastTry.join('')
			lastTry.push(numbers[i] + '+')
		}
	}
	return eval(lastTry.join('')) === M ? lastTry.join('') : 'No solution'
}

// console.log(findMofN(4, 46))
console.log(findMofN(5, 15))
