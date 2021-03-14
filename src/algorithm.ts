import { PossibleOptions } from './App';

export function calculate(bodyGrid: PossibleOptions[][], bottomGrid: number[][], rightGrid: number[][]) {
	console.log('TEST');
	if (!validateInputs(bodyGrid, bottomGrid, rightGrid)) {
		console.log('VALIDATION FAILURE');
	}
}

// Function to check and make sure there are proper values inserted in the input grid
function validateInputs(bodyGrid: PossibleOptions[][], bottomGrid: number[][], rightGrid: number[][]) {
	// If all conditions validations pass
	if (validateRightGridTotals(bodyGrid, rightGrid) && validateBottomGridTotals(bodyGrid, bottomGrid)) {
		console.log('VALIDATION SUCCESS');
		return true;
	}

	return false;
}

// Validate bodyGrid point totals aren't greater than rightGrid row total
function validateRightGridTotals(bodyGrid: PossibleOptions[][], rightGrid: number[][]): boolean {
	for (let i = 0; i < 5; i++) {
		let pointSum = 0; // Total points per row
		let voltorbSum = 0; // Total voltorbs per row

		for (let j = 0; j < 5; j++) {
			if (bodyGrid[i][j] === PossibleOptions.ONE || bodyGrid[i][j] === PossibleOptions.TWO || bodyGrid[i][j] === PossibleOptions.THREE) {
				pointSum += bodyGrid[i][j] as number;
			} else if (bodyGrid[i][j] === PossibleOptions.VOLTORB) {
				voltorbSum++;
			}
		}

		// Validate point and voltorb totals are not greater than rightGrid totals
		if (pointSum > rightGrid[i][0] || voltorbSum > rightGrid[i][1]) {
			return false;
		}
	}
	return true;
}

// Validate bodyGrid point totals aren't greater than bottomGrid column total
function validateBottomGridTotals(bodyGrid: PossibleOptions[][], bottomGrid: number[][]): boolean {
	for (let i = 0; i < 5; i++) {
		let pointSum = 0; // Total points per column
		let voltorbSum = 0; // Total voltorbs per column

		for (let j = 0; j < 5; j++) {
			if (typeof bodyGrid[j][i] === 'number') {
				pointSum += bodyGrid[j][i] as number;
			} else if (bodyGrid[j][i] === PossibleOptions.VOLTORB) {
				voltorbSum++;
			}
		}

		// Validate point and voltorb totals are not greater than bottomGrid totals
		if (pointSum > bottomGrid[i][0] || voltorbSum > bottomGrid[i][1]) {
			return false;
		}
	}
	return true;
}
