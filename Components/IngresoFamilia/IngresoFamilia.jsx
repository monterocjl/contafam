import {
  Box,
  Button,
  Select,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function IngresoFamilia({ tipoOperacion }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData) => {
      const completeData = {
        ...formData,
        operacion: tipoOperacion,
        usuario: "Juan Luis",
      };

      const JSONdata = JSON.stringify(completeData);
      const endpoint = "/api/fam";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };

      await fetch(endpoint, options);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box display='flex' flexDirection='column' gap={4}>
          <FormControl
            isInvalid={formik.errors.categoria}
            isRequired={formik.errors.categoria}
          >
            <Select
              id='categoria'
              name='categoria'
              type='select'
              onChange={formik.handleChange}
              placeholder='Tipo de ingreso'
            >
              <option value='Efectivo'>Efectivo</option>
              <option value='Depósito'>Depósito</option>
            </Select>
            <FormErrorMessage color='white' fontStyle='italic' mt='3px'>
              {formik.errors.categoria}
            </FormErrorMessage>
          </FormControl>

          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box>Importe S/.</Box>
            <Box w='40%'>
              <FormControl
                isInvalid={formik.errors.importe}
                isRequired={formik.errors.importe}
              >
                <Input
                  id='importe'
                  name='importe'
                  type='number'
                  placeholder='0'
                  onChange={formik.handleChange}
                />
                <FormErrorMessage color='white' fontStyle='italic' mt='3px'>
                  {formik.errors.importe}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Box mb={1}>Descripción</Box>
            <FormControl
              isInvalid={formik.errors.descripcion}
              isRequired={formik.errors.descripcion}
            >
              <Textarea
                id='descripcion'
                name='descripcion'
                type='text'
                onChange={formik.handleChange}
                placeholder='Ingresa una descripción'
                size='sm'
                resize='false'
              />

              <FormErrorMessage color='white' fontStyle='italic' mt='3px'>
                {formik.errors.descripcion}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Button type='submit' colorScheme='green'>
            Agregar ingreso
          </Button>
        </Box>
      </form>
    </>
  );
}

function initialValues() {
  return {
    importe: 0,
    categoria: "",
    descripcion: "",
  };
}

function validationSchema() {
  return {
    importe: Yup.string().required("The email is required."),
    categoria: Yup.string().required("The email is required."),
    descripcion: Yup.string().required("The email is required."),
  };
}
