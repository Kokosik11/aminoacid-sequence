import { Stack } from '@mui/joy';

import '@fontsource-variable/inter/index.css';
import { SequenceForm } from './features/Aligment/ui/SequenceForm';
import { SequenceResults } from './features/Aligment/ui/Sequence/SequenceResults';

function App() {

  return (
    <Stack spacing={2}>
      <SequenceForm />
      <SequenceResults />
    </Stack>
  )
}

export default App
