import { describe, it, expect } from 'vitest';
import { needlemanWunsch } from './needlemanWunsch';

type TestCase = {
  desc: string;
  seq1: string;
  seq2: string;
  expectedScore?: number;
  expectedAlignedSeq1?: string;
  expectedAlignedSeq2?: string;
};

/*
    Сверял ожидаемый результат с фактическим с помощью сайта:
    https://rna.informatik.uni-freiburg.de/Teaching/index.jsp?toolName=Needleman-Wunsch
*/
const testCases: TestCase[] = [
  {
    desc: 'Полное совпадение без пропусков',
    seq1: 'GATTACA',
    seq2: 'GATTACA',
    expectedScore: 7,
    expectedAlignedSeq1: 'GATTACA',
    expectedAlignedSeq2: 'GATTACA',
  },
  {
    desc: 'Один символ несовпадает',
    seq1: 'GATTACA',
    seq2: 'GACTACA',
    expectedAlignedSeq1: 'GATTACA',
    expectedAlignedSeq2: 'GACTACA',
  },
  {
    desc: 'Одинаковые символы с разным порядком',
    seq1: 'GATTACA',
    seq2: 'ACTAGAC',
    expectedAlignedSeq1: 'GATTACA-',
    expectedAlignedSeq2: '-ACTAGAC',
  },
  {
    desc: 'Вставка/удаление символов',
    seq1: 'GAT',
    seq2: 'GAAT',
    expectedAlignedSeq1: 'G-AT',
    expectedAlignedSeq2: 'GAAT',
  },
  {
    desc: 'Обе строки пустые',
    seq1: '',
    seq2: '',
    expectedScore: -0,
    expectedAlignedSeq1: '',
    expectedAlignedSeq2: '',
  },
  {
    desc: 'Одна строка пустая',
    seq1: '',
    seq2: 'ACGT',
    expectedScore: -8,
    expectedAlignedSeq1: '----',
    expectedAlignedSeq2: 'ACGT',
  },
];

describe('Needleman-Wunsch global alignment', () => {
  testCases.forEach(
    ({ desc, seq1, seq2, expectedScore, expectedAlignedSeq1, expectedAlignedSeq2 }) => {
      it(desc, () => {
        const result = needlemanWunsch(seq1, seq2);

        if (expectedScore !== undefined) {
          expect(result.score).toBe(expectedScore);
        }

        if (expectedAlignedSeq1 !== undefined) {
          expect(result.alignedSeq1).toBe(expectedAlignedSeq1);
        }

        if (expectedAlignedSeq2 !== undefined) {
          expect(result.alignedSeq2).toBe(expectedAlignedSeq2);
        }
      });
    }
  );
});
