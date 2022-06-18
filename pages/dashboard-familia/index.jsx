import { useState } from "react";
import { Client } from "@notionhq/client";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BsImage } from "react-icons/bs";

import Layout from "../../Components/Layout/Layout";
import Totales from "../../Components/Totales/Totales";
export default function Index({ data }) {
  const [image, setImage] = useState("/img/default.jpg");
  const { isOpen, onOpen, onClose } = useDisclosure();

  function showImage(imgUrl) {
    setImage(imgUrl);
    onOpen();
  }

  return (
    <>
      <Layout>
        <Box pt={6} textAlign='center' fontSize='2xl' fontWeight='bold'>
          Tabla Familia
        </Box>
        <Box m={6} p={2} border='1px solid #4A5568' borderRadius='8px'>
          <TableContainer>
            <Table size='md' variant='simple'>
              <Thead>
                <Tr>
                  <Th>Usuario</Th>
                  <Th isNumeric>Importe</Th>
                  <Th textAlign='center'>Operación</Th>
                  <Th textAlign='center'>Categoría</Th>
                  <Th textAlign='center'>Adjunto</Th>
                  <Th>Descripción</Th>
                  <Th>Fecha</Th>
                </Tr>
              </Thead>
              <Tbody color='#CBD5E0'>
                {data.map((operacion) => (
                  <Tr key={operacion.id}>
                    <Td>{operacion.properties.Usuario.title[0].plain_text}</Td>
                    <Td isNumeric fontWeight='bold'>
                      S/. {operacion.properties.Importe.number}
                    </Td>
                    <Td textAlign='center'>
                      {operacion.properties.Operacion.select.name}
                    </Td>
                    <Td textAlign='center'>
                      {operacion.properties.Categoria.select.name}
                    </Td>

                    <Td textAlign='center'>
                      {operacion.properties.Adjunto.rich_text[0]?.plain_text ? (
                        <IconButton
                          onClick={() =>
                            showImage(
                              operacion.properties.Adjunto.rich_text[0]
                                ?.plain_text
                            )
                          }
                          variant='outline'
                          colorScheme='teal'
                          aria-label='Call Sage'
                          fontSize='20px'
                          icon={<BsImage />}
                        />
                      ) : (
                        "-"
                      )}
                    </Td>
                    <Td
                      maxW='150px'
                      whiteSpace='nowrap'
                      textOverflow='ellipsis'
                      overflow='hidden'
                    >
                      {operacion.properties.Descripcion.rich_text[0].plain_text}
                    </Td>
                    <Td>{operacion.properties.Creacion.created_time}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Usuario</Th>
                  <Th isNumeric>Importe</Th>
                  <Th textAlign='center'>Operación</Th>
                  <Th textAlign='center'>Categoría</Th>
                  <Th textAlign='center'>Adjunto</Th>
                  <Th>Descripción</Th>
                  <Th>Fecha</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
        <Totales data={data} />
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent bg='#171923' w='90%'>
            <ModalCloseButton />
            <ModalBody mt={8} mb={4} mx={2}>
              <Image w='auto' h='100%' src={image} alt='' borderRadius='8px' />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Creacion",
        direction: "ascending",
      },
    ],
  });

  const data = response.results;

  return {
    props: {
      data,
    },
  };
}
