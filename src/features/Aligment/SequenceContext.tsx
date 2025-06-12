import { createContext, useContext, useState } from "react";
import type { AlignmentResult, AminoAcidType } from "./types";
import { needlemanWunsch } from "./needlemanWunsch";


export interface ISequenceContext {
    firstSequence: AminoAcidType[];
    secondSequence: AminoAcidType[];
    changeFirstSequence: (sequence: string | "") => void;
    changeSecondSequence: (sequence: string | "") => void;
    result: AlignmentResult | null;
    error: string[];
    compute: () => void;
}

const SequenceContext = createContext(null as unknown as ISequenceContext);
export const SequenceContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [firstSequence, setFirstSequence] = useState<AminoAcidType[]>([]);
    const [secondSequence, setSecondSequence] = useState<AminoAcidType[]>([]);
    const [result, setResult] = useState<AlignmentResult | null>(null);
    const [error, setError] = useState<string[]>([]);

    const changeFirstSequence = (sequence: string | "") => {
        if (sequence.match(/^[ARNDCEQGHILKMFPSTWYV ]+$/) || sequence === '') {
            setFirstSequence(sequence.split("") as AminoAcidType[]);
        }
    }

    const changeSecondSequence = (sequence: string | "") => {
        if (sequence.match(/^[ARNDCEQGHILKMFPSTWYV ]+$/) || sequence === '') {
            setSecondSequence(sequence.split("") as AminoAcidType[]);
        }
    }

    const compute = () => {
        setError([]);
        if (firstSequence.join("") === '' || secondSequence.join("") === '') {
            setError(errors => [...errors, 'Sequences must not be empty']);
            return;
        };
        if (firstSequence.length !== secondSequence.length) {
            setError(errors => [...errors, 'Sequences must have the same length']);
            return;
        }

        setResult(needlemanWunsch(firstSequence.join(""), secondSequence.join("")));
    }


    const context = {
        firstSequence,
        secondSequence,
        changeFirstSequence,
        changeSecondSequence,
        error,
        result,
        compute
    }

    return (
        <SequenceContext.Provider value={context}>
            {children}
        </SequenceContext.Provider>
    )
}

export const useSequenceContext = () => useContext(SequenceContext);