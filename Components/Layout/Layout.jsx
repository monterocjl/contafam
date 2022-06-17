import { useEffect, useState } from "react";
import { Box, Avatar } from "@chakra-ui/react";
import Link from "next/link";

export default function Layout({ children }) {
  const [imagen, setImagen] = useState("default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("Usuario")) {
        setImagen(localStorage.getItem("Avatar"));
      }
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
              border='3px solid #2B6CB0'
              src={`/img/${imagen}.jpg`}
            />
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            gap={5}
            fontWeight='bold'
          >
            <Link href='/product'>
              <a>Cambiar tabla</a>
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
