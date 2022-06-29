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
  Spinner,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { BsImage } from "react-icons/bs";
import Layout from "../../Components/Layout/Layout";
import Totales from "../../Components/Totales/Totales";
import { format } from "date-fns";

export default function Index({ data }) {
  const [image, setImage] = useState("/img/default.jpg");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingImage, setLoadingImage] = useState(false);
  const [fechaFiltroInicial, setFechaFiltroInicial] = useState(
    "Jun 18 1999 GMT-0500"
  );
  const [fechaFiltroFinal, setFechaFiltroFinal] = useState(
    "Jun 18 2055 23:59:59 GMT-0500"
  );
  const [dataFiltrada, setDataFiltrada] = useState("");

  function showImage(imgUrl) {
    setImage(imgUrl);
    onOpen();
    setLoadingImage(true);

    setTimeout(() => {
      setLoadingImage(false);
    }, 500);
  }

  function filtrarPorMes(month, year) {
    setFechaFiltroInicial(`${month} 01 ${year} 00:00:00 GMT-0500`);
    setFechaFiltroFinal(`${month + 1} 01 ${year} 00:00:00 GMT-0500`);
  }

  return (
    <>
      <Layout>
        <Totales data={dataFiltrada === "" ? data : dataFiltrada} />
        <Box pt={7} textAlign='center' fontSize='2xl' fontWeight='bold'>
          Tabla Familia
        </Box>
        <Box
          mt={6}
          p={2}
          border='1px solid #4A5568'
          borderRadius='8px'
          maxW='1250px'
          mx={{ base: 6, md: "auto" }}
        >
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
                {/* {data.map((operacion) =>
                  1 < 2 ? <Tr key={operacion.id}></Tr> : ""
                )} */}
                {data.map((operacion) =>
                  new Date(operacion.properties.Creacion.created_time) >=
                    new Date(fechaFiltroInicial) &&
                  new Date(operacion.properties.Creacion.created_time) <=
                    new Date(fechaFiltroFinal) ? (
                    <Tr key={operacion.id}>
                      <Td>
                        {operacion.properties.Usuario.title[0].plain_text}
                      </Td>
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
                        {operacion.properties.Adjunto.rich_text[0]
                          ?.plain_text ? (
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
                        <Tooltip
                          borderRadius='8px'
                          py={2}
                          px={3}
                          label={
                            operacion.properties.Descripcion.rich_text[0]
                              .plain_text
                          }
                          placement='bottom-start'
                        >
                          {
                            operacion.properties.Descripcion.rich_text[0]
                              .plain_text
                          }
                        </Tooltip>
                      </Td>
                      <Td>
                        {`${format(
                          new Date(
                            operacion.properties.Fecha_operacion.date.start
                          ),
                          "dd MMM yyyy"
                        )}`}
                      </Td>
                    </Tr>
                  ) : (
                    ""
                  )
                )}
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
          {/* <Button onClick={() => filtrarPorMes(6, "2022")} colorScheme='green'>
            Junio
          </Button> */}
        </Box>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent bg='#171923' w='90%' maxH='85vh' overflow='auto'>
            <ModalCloseButton />
            <ModalBody
              mt={8}
              mb={4}
              mx={1}
              display='flex'
              justifyContent='center'
            >
              {loadingImage ? <Spinner size='lg' /> : ""}
              <Image
                display={!loadingImage ? "block" : "none"}
                w='100%'
                h='auto'
                src={image}
                alt=''
                borderRadius='8px'
              />
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
        property: "Fecha_operacion",
        direction: "descending",
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
