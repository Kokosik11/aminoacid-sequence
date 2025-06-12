import { useSequenceContext } from "../../SequenceContext"
import type { AminoAcidType } from "../../types";
import { SequenceList } from "./SequenceList"


export const SequenceResults = () => {
    const { result } = useSequenceContext();

    if (result) {
        return (
            <SequenceList
                first={result.alignedSeq1.split('') as AminoAcidType[]}
                second={result.alignedSeq2.split('') as AminoAcidType[]}
            />
        )
    } 

    return null;
}