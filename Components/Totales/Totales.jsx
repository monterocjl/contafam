import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

export default function Totales({ data }) {
  const [total, setTotal] = useState(0);

  function getTotales() {
    const newArray = [];

    data.map((e) => {
      newArray.push(e.properties.Importe.number);
    });

    const sumaTotal = 0;

    for (let i = 0; i < newArray.length; i++) {
      sumaTotal += newArray[i];
    }

    setTotal(sumaTotal);
  }

  return (
    <>
      <Box m={6}>
        {/* <Box>{total}</Box>
        <Button onClick={getTotales}>Ver total</Button> */}
      </Box>
    </>
  );
}
