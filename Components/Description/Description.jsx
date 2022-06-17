import { Box, Textarea, FormControl, FormErrorMessage } from "@chakra-ui/react";

export default function Description({ error, reference, onChange }) {
  return (
    <>
      <Box>
        <Box mb={1} fontSize='md'>
          Descripción (opcional)
        </Box>
        <FormControl isInvalid={error} isRequired={error}>
          <Textarea
            ref={reference}
            id='descripcion'
            name='descripcion'
            type='text'
            onChange={onChange}
            placeholder='Agrega una descripción'
            size='sm'
            resize='false'
            fontSize='xl'
          />

          <FormErrorMessage color='white' fontStyle='italic' mt='3px'>
            {error}
          </FormErrorMessage>
        </FormControl>
      </Box>
    </>
  );
}
