import Layout from "../../Components/Layout/Layout";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Product() {
  return (
    <>
      <Layout>
        <Box
          h='calc(100vh - 100px)'
          display='flex'
          justifyContent='center'
          alignItems='center'
          gap='50px'
        >
          <Link href='/product/familia'>
            <a>
              <Button colorScheme='blue' px={8}>
                Familia
              </Button>
            </a>
          </Link>
          <Link href='/product/chifles'>
            <a>
              <Button px={8} colorScheme='yellow'>
                Chifles
              </Button>
            </a>
          </Link>
        </Box>
      </Layout>
    </>
  );
}
