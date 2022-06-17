import Layout from "../../Components/Layout/Layout";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Product() {
  return (
    <>
      <Layout>
        <Box
          h='calc(100vh - 120px)'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          gap='30px'
        >
          <Link href='/product/familia'>
            <a>
              <Button fontSize='2xl' colorScheme='teal' px={9} py={6}>
                Familia
              </Button>
            </a>
          </Link>
          <Link href='/product/chifles'>
            <a>
              <Button fontSize='2xl' colorScheme='yellow' px={9} py={6}>
                Chifles
              </Button>
            </a>
          </Link>
        </Box>
      </Layout>
    </>
  );
}
