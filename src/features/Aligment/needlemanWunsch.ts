import type { AlignmentResult } from "./types";

export const needlemanWunsch = (
	seq1: string,
	seq2: string,
	matchScore = 1,
	mismatchPenalty = -1,
	gapPenalty = -2
): AlignmentResult => {
	const m = seq1.length;
	const n = seq2.length;

	const scoreMatrix: number[][] = Array.from({ length: m + 1 }, () =>
		new Array(n + 1).fill(0)
	);

	// заполнение матрицы
	for (let i = 0; i <= m; i++) scoreMatrix[i][0] = i * gapPenalty;
	for (let j = 0; j <= n; j++) scoreMatrix[0][j] = j * gapPenalty;

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			const match = seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchPenalty;
			scoreMatrix[i][j] = Math.max(
				scoreMatrix[i - 1][j - 1] + match,         // диагональ
				scoreMatrix[i - 1][j] + gapPenalty,       // сверху (gap в seq2)
				scoreMatrix[i][j - 1] + gapPenalty        // слева (gap в seq1)
			);
		}
	}

	// обратный проход
	let alignedSeq1 = '';
	let alignedSeq2 = '';
	let i = m;
	let j = n;

	while (i > 0 || j > 0) {
		const currentScore = scoreMatrix[i][j];

		if (
			i > 0 &&
			j > 0 &&
			currentScore ===
			scoreMatrix[i - 1][j - 1] +
			(seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchPenalty)
		) {
			alignedSeq1 = seq1[i - 1] + alignedSeq1;
			alignedSeq2 = seq2[j - 1] + alignedSeq2;
			i--;
			j--;
		} else if (i > 0 && currentScore === scoreMatrix[i - 1][j] + gapPenalty) {
			alignedSeq1 = seq1[i - 1] + alignedSeq1;
			alignedSeq2 = '-' + alignedSeq2;
			i--;
		} else {
			alignedSeq1 = '-' + alignedSeq1;
			alignedSeq2 = seq2[j - 1] + alignedSeq2;
			j--;
		}
	}

	return {
		alignedSeq1,
		alignedSeq2,
		score: scoreMatrix[m][n],
	};
}