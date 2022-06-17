import { Box, Avatar } from "@chakra-ui/react";
import Layout from "../Components/Layout/Layout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  function setUserInLocalStorage(usuario, avatar) {
    if (typeof window !== "undefined") {
      localStorage.setItem("Usuario", usuario);
      localStorage.setItem("Avatar", avatar);
      router.replace("/product");
    }
  }
  return (
    <>
      <Layout>
        <Box
          h='calc(100vh - 100px)'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          gap='50px'
        >
          <Box display='flex' gap='50px' w='100%' justifyContent='center'>
            <Avatar
              size='2xl'
              name='Luchita'
              src='/img/lucha.jpg'
              border='8px solid #C6F6D5'
              onClick={() => setUserInLocalStorage("Luchita", "lucha")}
            />
            <Avatar
              size='2xl'
              name='Juanito'
              src='/img/juanito.jpg'
              border='8px solid #C6F6D5'
              onClick={() => setUserInLocalStorage("Juanito", "juanito")}
            />
          </Box>
          <Box display='flex' gap='50px' w='100%' justifyContent='center'>
            <Avatar
              size='2xl'
              name='Claudia'
              src='/img/clau.jpg'
              border='8px solid #C6F6D5'
              onClick={() => setUserInLocalStorage("Claudia", "clau")}
            />
            <Avatar
              size='2xl'
              name='Juan Luis'
              src='/img/jl.jpg'
              border='8px solid #C6F6D5'
              onClick={() => setUserInLocalStorage("Juan Luis", "jl")}
            />
          </Box>
        </Box>
      </Layout>
    </>
  );
}
