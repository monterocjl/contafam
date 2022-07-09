import { Box } from "@chakra-ui/react";

export default function CardTotal({ title, total, color }) {
  return (
    <>
      <Box w='fit-content' fontWeight='bold'>
        <Box textAlign='center' fontSize={{ base: "sm", md: "lg" }}>
          {title}
        </Box>
        <Box
          fontSize={{ base: "xl", md: "2xl" }}
          textAlign='center'
          color={color}
        >
          S/. {total}
        </Box>
      </Box>
    </>
  );
}
