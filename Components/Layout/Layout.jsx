import { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
            gap={3}
            fontWeight='bold'
          >
            <Menu>
              <MenuButton
                as={Button}
                variant='outline'
                colorScheme='blue'
                _focus={[]}
                _hover={[]}
              >
                Consolidado
              </MenuButton>
              <MenuList bg='gray.900' borderColor='gray.700'>
                <MenuItem _focus={{ bg: "gray.700" }} p='0'>
                  <Link href='/dashboard-familia' w='100%'>
                    <Box fontWeight='bold' w='100%' p='5px 10px'>
                      <a>Consolidado Familia</a>
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem _focus={{ bg: "gray.700" }} p='0'>
                  <Link href='/dashboard-chifles' w='100%'>
                    <Box fontWeight='bold' w='100%' p='5px 10px'>
                      <a>Consolidado Chifles</a>
                    </Box>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme='blue'
                _focus={[]}
                _hover={[]}
              >
                Nueva operación
              </MenuButton>
              <MenuList bg='gray.900' borderColor='gray.700'>
                <MenuItem _focus={{ bg: "gray.700" }} p='0'>
                  <Link href='/product/familia' w='100%'>
                    <Box w='100%' p='5px 10px'>
                      <a>Familia</a>
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem _focus={{ bg: "gray.700" }} p='0'>
                  <Link href='/product/chifles' w='100%'>
                    <Box w='100%' p='5px 10px'>
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
