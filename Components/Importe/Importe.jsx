import { Box, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";

export default function Importe({ error, reference, onChange }) {
  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        gap={3}
      >
        <Box fontWeight='bold'>Importe S/.</Box>
        <Box w='68%'>
          <FormControl isInvalid={error} isRequired={error}>
            <Input
              ref={reference}
              id='importe'
              name='importe'
              type='number'
              step='any'
              placeholder='0'
              fontWeight='bold'
              onChange={onChange}
            />
            <FormErrorMessage color='white' fontStyle='italic' mt='3px'>
              {error}
            </FormErrorMessage>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
