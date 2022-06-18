import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import Layout from "../../../Components/Layout/Layout";
import IngresoFamilia from "../../../Components/IngresoFamilia/IngresoFamilia";
import GastoFamilia from "../../../Components/GastoFamilia/GastoFamilia";

export default function Familia() {
  const [tipo, setTipo] = useState(undefined);

  function toggleTipo(e) {
    setTipo(e);
  }

  return (
    <>
      <Layout>
        <Box px={10} pt={5} maxW='450px' mx='auto'>
          <Box textAlign='center' fontSize='3xl' mb={7} fontWeight='bold'>
            Familia
          </Box>
          <Box display='flex' gap={5} justifyContent='center'>
            <Button onClick={() => toggleTipo("Ingreso")} colorScheme='green'>
              Ingreso
            </Button>
            <Button onClick={() => toggleTipo("Gasto")} colorScheme='red'>
              Gasto
            </Button>
          </Box>
          <Box mt={5}>
            {tipo == "Ingreso" ? <IngresoFamilia tipoOperacion={tipo} /> : ""}
            {tipo === "Gasto" ? <GastoFamilia tipoOperacion={tipo} /> : ""}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
