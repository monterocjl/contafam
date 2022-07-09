import { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";

export default function CardTotalByUser({ user, data }) {
  const [avatar, setAvatar] = useState("");
  const [aporte, setAporte] = useState(0);

  console.log(aporte);

  useEffect(() => {
    const arrayAporte = [];
    if (user == "Juanito") {
      data.map((e) => {
        if (e.properties.Usuario.title[0].plain_text === "Juanito")
          arrayAporte.push(e.properties.Importe.number);
        const sumaTotal = 0;
        for (let i = 0; i < arrayAporte.length; i++) {
          sumaTotal += arrayAporte[i];
        }
        setAporte(sumaTotal);
      });
      setAvatar("/img/juanito.jpg");
    } else if (user == "Claudia") {
      data.map((e) => {
        if (
          e.properties.Usuario.title[0].plain_text === "Claudia" &&
          e.properties.Operacion.select.name === "Ingreso"
        )
          arrayAporte.push(e.properties.Importe.number);
        const sumaTotal = 0;
        for (let i = 0; i < arrayAporte.length; i++) {
          sumaTotal += arrayAporte[i];
        }
        setAporte(sumaTotal);
      });
      setAvatar("/img/clau.jpg");
    } else if (user == "Juan Luis") {
      data.map((e) => {
        if (
          e.properties.Usuario.title[0].plain_text === "Juan Luis" &&
          e.properties.Operacion.select.name === "Ingreso"
        )
          arrayAporte.push(e.properties.Importe.number);
        const sumaTotal = 0;
        for (let i = 0; i < arrayAporte.length; i++) {
          sumaTotal += arrayAporte[i];
        }
        setAporte(sumaTotal);
      });
      setAvatar("/img/jl.jpg");
    } else if (user == "Luchita") {
      data.map((e) => {
        if (
          e.properties.Usuario.title[0].plain_text === "Luchita" &&
          e.properties.Operacion.select.name === "Ingreso"
        )
          arrayAporte.push(e.properties.Importe.number);
        const sumaTotal = 0;
        for (let i = 0; i < arrayAporte.length; i++) {
          sumaTotal += arrayAporte[i];
        }
        setAporte(sumaTotal);
      });
      setAvatar("/img/lucha.jpg");
    }
  }, [data, user]);

  return (
    <>
      <Box
        w={{ base: "100%", md: "185px" }}
        borderRadius='8px'
        mx={{ base: 6, md: "0" }}
        px={4}
        py={3}
        border='1px solid #4A5568'
        display='flex'
        alignItems='center'
        flexDirection='column'
      >
        <Box display='flex' alignItems='center' gap={1} mb={2}>
          <Image w='30px' h='30px' borderRadius='50px' src={avatar} alt='' />
          <Box fontSize='md' fontWeight='bold'>
            {user}
          </Box>
        </Box>
        <Box fontWeight='bold' display='flex' alignItems='center' gap={1}>
          <Box>Aporte:</Box>
          <Box fontSize='lg' color='green.500'>
            S/. {aporte}
          </Box>
        </Box>
      </Box>
    </>
  );
}
