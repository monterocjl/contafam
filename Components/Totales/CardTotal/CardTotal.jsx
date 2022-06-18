import { Box } from "@chakra-ui/react";

export default function CardTotal({ title, total, color }) {
  return (
    <>
      <Box
        borderRadius='8px'
        px={4}
        py={3}
        border='1px solid #4A5568'
        w='fit-content'
        fontWeight='bold'
      >
        <Box textAlign='center'>{title}</Box>
        <Box fontSize='2xl' textAlign='center' color={color}>
          S/. {total}
        </Box>
      </Box>
    </>
  );
}
