import React from "react";
import {
  useDisclosure,
  Tooltip,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";

export default function ModalDescripcion({ descripcion }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip
        borderRadius='8px'
        py={2}
        px={3}
        label={descripcion}
        placement='bottom-start'
      >
        <Box
          display={{ base: "none", md: "block" }}
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          overflow='hidden'
        >
          {descripcion}
        </Box>
      </Tooltip>

      <Button
        display={{ base: "block", md: "none" }}
        variant='outline'
        onClick={onOpen}
        mx='auto'
        h='35px'
      >
        Ver
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='#171923'>
          <ModalHeader fontSize='md' pb='0' textDecoration='underline'>
            Descripción
          </ModalHeader>
          <ModalBody fontSize='lg' fontWeight='bold'>
            {descripcion}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
