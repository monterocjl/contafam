import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import CardTotal from "./CardTotal/CardTotal";

export default function Totales({ data }) {
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);

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
        else if (e.properties.Operacion.select.name === "Ingreso") {
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
        mt={10}
        mx={{ base: 6, md: "auto" }}
        display='flex'
        gap={4}
        justifyContent='center'
        flexWrap='wrap'
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
    </>
  );
}
