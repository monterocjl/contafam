import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import Layout from "../../../Components/Layout/Layout";
import IngresoChifles from "../../../Components/IngresoChifles/IngresoChifles";
import GastoChifles from "../../../Components/GastoChifles/GastoChifles";

export default function Chifles() {
  const [tipo, setTipo] = useState(undefined);

  function toggleTipo(e) {
    setTipo(e);
  }

  return (
    <>
      <Layout>
        <Box px={10} pt={5} maxW='450px' mx='auto'>
          <Box textAlign='center' fontSize='3xl' mb={7} fontWeight='bold'>
            Chifles
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
            {tipo == "Ingreso" ? <IngresoChifles tipoOperacion={tipo} /> : ""}
            {tipo === "Gasto" ? <GastoChifles tipoOperacion={tipo} /> : ""}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
