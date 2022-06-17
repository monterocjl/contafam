import { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ChevronDownIcon,
  Button,
} from "@chakra-ui/react";
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
            <Menu>
              <MenuButton
                as={Button}
                variant='outline'
                colorScheme='blue'
                _focus='none'
                _hover='none'
                _expanded='none'
              >
                Ir a tabla
              </MenuButton>
              <MenuList bg='gray.900' borderColor='gray.700'>
                <MenuItem _focus={{ bg: "gray.700" }}>
                  <Link href='/dashboard-familia'>
                    <a>Tabla Familia</a>
                  </Link>
                </MenuItem>
                <MenuItem _focus={{ bg: "gray.700" }}>
                  <Link href='/dashboard-chifles'>
                    <a>Tabla Chifles</a>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme='blue'
                _focus='none'
                _hover='none'
                _expanded='none'
              >
                Producto
              </MenuButton>
              <MenuList bg='gray.900' borderColor='gray.700'>
                <MenuItem _focus={{ bg: "gray.700" }}>
                  <Link href='/product/familia' w='100%'>
                    <Box w='100%'>
                      <a>Familia</a>
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem _focus={{ bg: "gray.700" }}>
                  <Link href='/product/chifles' w='100%'>
                    <Box w='100%'>
                      <a>Chifles</a>
                    </Box>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Box />
      {children}
      <Box />
    </>
  );
}
