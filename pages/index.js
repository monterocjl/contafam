import { useEffect, useState } from "react";
import { Box, Avatar } from "@chakra-ui/react";
import Layout from "../Components/Layout/Layout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [notLogin, setNotLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("Usuario")) {
        router.replace("/product");
      } else {
        setNotLogin(true);
      }
    }
  }, [router]);

  function setUserInLocalStorage(usuario, avatar) {
    if (typeof window !== "undefined") {
      localStorage.setItem("Usuario", usuario);
      localStorage.setItem("Avatar", avatar);
      router.replace("/product");
    }
  }

  if (!notLogin) {
    return "";
  } else {
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
                border='8px solid #4A5568'
                onClick={() => setUserInLocalStorage("Luchita", "lucha")}
              />
              <Avatar
                size='2xl'
                name='Juanito'
                src='/img/juanito.jpg'
                border='8px solid #4A5568'
                onClick={() => setUserInLocalStorage("Juanito", "juanito")}
              />
            </Box>
            <Box display='flex' gap='50px' w='100%' justifyContent='center'>
              <Avatar
                size='2xl'
                name='Claudia'
                src='/img/clau.jpg'
                border='8px solid #4A5568'
                onClick={() => setUserInLocalStorage("Claudia", "clau")}
              />
              <Avatar
                size='2xl'
                name='Juan Luis'
                src='/img/jl.jpg'
                border='8px solid #4A5568'
                onClick={() => setUserInLocalStorage("Juan Luis", "jl")}
              />
            </Box>
          </Box>
        </Layout>
      </>
    );
  }
}
