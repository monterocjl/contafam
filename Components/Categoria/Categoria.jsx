import { Select, FormControl, FormErrorMessage } from "@chakra-ui/react";

export default function Categoria({ error, reference, onChange, options }) {
  return (
    <>
      <FormControl isInvalid={error} isRequired={error}>
        <Select
          id='categoria'
          name='categoria'
          type='select'
          onChange={onChange}
          placeholder='Operación'
          fontSize='xl'
          ref={reference}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <FormErrorMessage color='white' fontStyle='italic' mt='3px'>
          {error}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}
