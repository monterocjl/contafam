import { useEffect, useState } from "react";
import { Box, Avatar } from "@chakra-ui/react";
import Link from "next/link";

export default function Layout({ children }) {
  const [imagen, setImagen] = useState();

  console.log(imagen);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setImagen(localStorage.getItem("Avatar"));
    }
  }, []);

  return (
    <>
      <Box pt={3} px={3}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box w='50px' h='50px'>
            <Avatar
              borderRadius='100px'
              name='Juan'
              src={`/img/${imagen}.jpg`}
            />
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            gap={5}
          >
            <Link href='/'>
              <a>Inicio</a>
            </Link>
            <Link href='/product'>
              <a>Producto</a>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box />
      {children}
      <Box />
    </>
  );
}
