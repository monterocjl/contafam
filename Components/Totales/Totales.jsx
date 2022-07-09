import { useState, useEffect } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import CardTotal from "./CardTotal/CardTotal";
import CardTotalByUser from "./CardTotalByUser/CardTotalByUser.jsx";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function Totales({ data }) {
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    const arrayGastos = [];
    const arrayIngresos = [];

    if (data) {
      data.map((e) => {
        //TOTAL GASTOS
        if (e.properties.Operacion.select.name === "Gasto") {
          arrayGastos.push(e.properties.Importe.number);
          const sumaTotal = 0;
          for (let i = 0; i < arrayGastos.length; i++) {
            sumaTotal += arrayGastos[i];
          }
          setTotalGastos(sumaTotal);
        }
        //TOTAL INGRESOS
        if (
          e.properties.Operacion.select.name === "Ingreso" ||
          e.properties.Usuario.title[0].plain_text === "Juanito"
        ) {
          arrayIngresos.push(e.properties.Importe.number);
          const sumaTotal = 0;
          for (let i = 0; i < arrayIngresos.length; i++) {
            sumaTotal += arrayIngresos[i];
          }
          setTotalIngresos(sumaTotal);
        }
      });
    }
  }, [data]);

  return (
    <>
      <Box
        maxW='1250px'
        mx={{ base: 6, md: "auto" }}
        display='flex'
        alignItems='center'
        gap={3}
        mt={{ base: 10, md: 2 }}
        justifyContent='space-between'
      >
        <Box fontSize={{ base: "xl", md: "2xl" }} fontWeight='bold'>
          Dashboard
        </Box>
        <IconButton
          aria-label='Filtrar'
          icon={showTable ? <AiFillEye /> : <AiFillEyeInvisible />}
          variant='outline'
          _hover={[]}
          _focus={[]}
          onClick={() => setShowTable((prev) => !prev)}
          fontSize='lg'
        />
      </Box>
      <Box display={showTable ? "block" : "none"}>
        <Box
          mt={3}
          mx={{ base: 6, md: "auto" }}
          display='flex'
          gap={4}
          justifyContent='center'
          flexWrap='wrap'
          borderRadius='8px'
          px={4}
          py={3}
          border='1px solid #4A5568'
          w={{ base: "auto", md: "fit-content" }}
          mb={3}
        >
          <CardTotal
            title='Total ingresos'
            color='green.500'
            total={totalIngresos.toFixed(2)}
          />
          <CardTotal
            title='Total gastos'
            color='red.500'
            total={totalGastos.toFixed(2)}
          />
          <CardTotal
            title='Resultado'
            color={totalIngresos - totalGastos >= 0 ? "green.500" : "red.500"}
            total={(totalIngresos - totalGastos).toFixed(2)}
          />
        </Box>
        <Box
          display='flex'
          gap={3}
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
        >
          <CardTotalByUser user='Juanito' data={data} />
          <CardTotalByUser user='Claudia' data={data} />
          <CardTotalByUser user='Luchita' data={data} />
          <CardTotalByUser user='Juan Luis' data={data} />
        </Box>
      </Box>
    </>
  );
}
