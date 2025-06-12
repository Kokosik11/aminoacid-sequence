import { Card, FormControl, Stack, FormLabel, FormHelperText, Button, Textarea } from "@mui/joy";
import { useSequenceContext } from "../../SequenceContext";

import "./styles.css";

export const SequenceForm = () => {
    const {
        firstSequence,
        secondSequence,
        changeFirstSequence,
        changeSecondSequence,
        error,
        compute
    } = useSequenceContext();

    return (
        <Stack className="sequence-form__container">
            <Card className="sequence-form__card">
                <FormControl>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>First amino acid sequence</FormLabel>
                            <Textarea
                                placeholder='First amino acid sequence'
                                value={firstSequence.join("")}
                                onChange={(e) => changeFirstSequence(e.target.value)}
                                required
                            />
                            <FormHelperText>Only amino acids are allowed</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Second amino acid sequence</FormLabel>
                            <Textarea
                                placeholder='Second amino acid sequence'
                                value={secondSequence.join("")}
                                onChange={(e) => changeSecondSequence(e.target.value)}
                                required
                            />
                            <FormHelperText>Only amino acids are allowed</FormHelperText>
                        </FormControl>
                        {error && <FormHelperText style={{ color: 'red' }}>{error}</FormHelperText>}
                        <Button type="submit" onClick={compute}>Align</Button>
                    </Stack>
                </FormControl>
            </Card>
        </Stack>
    )
}