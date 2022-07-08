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
  useDisclosure,
  Tooltip,
  Tag,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiFilterAlt } from "react-icons/bi";
import Layout from "../../Components/Layout/Layout";
import Totales from "../../Components/Totales/Totales";
import { format } from "date-fns";
import ModalImagenAdjunta from "../../Components/ModalImagenAdjunta/ModalImagenAdjunta";
import ModalDescripcion from "../../Components/ModalDescripcion/ModalDescripcion";

export default function Index({ data }) {
  const [dataFiltrada, setDataFiltrada] = useState(data);
  const [month, setMonth] = useState("");

  function filtrarPorMes(fromDate, toDate, monthFilter) {
    const newArray = [];
    data.map((elemento) => {
      if (
        elemento.properties.Fecha_operacion.date.start >= fromDate &&
        elemento.properties.Fecha_operacion.date.start <= toDate
      )
        newArray.push(elemento);
    });

    setDataFiltrada(newArray);
    setMonth(monthFilter);
  }

  return (
    <>
      <Layout>
        <Totales data={dataFiltrada} />
        <Box
          pt={7}
          textAlign='center'
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight='bold'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          maxW='1250px'
          mx={{ base: 6, md: "auto" }}
        >
          <Box>Tabla Familia</Box>
          <Box display='flex' gap={2} alignItems='center'>
            <Box display='flex' alignItems='center' gap={1} fontSize='md'>
              <Box fontStyle='italic'>{month == "" ? "" : "Filtrado por:"}</Box>
              <Box>{month}</Box>
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<BiFilterAlt />}
                variant='outline'
                _hover={[]}
                _focus={[]}
              />
              <MenuList bg='gray.900' borderColor='gray.700'>
                <MenuItem
                  _focus={{ bg: "gray.700" }}
                  p='0'
                  onClick={() =>
                    filtrarPorMes("2022-07-01", "2022-07-31", "Julio")
                  }
                >
                  <Box fontSize='lg' w='100%' p='5px 10px'>
                    Julio 2022
                  </Box>
                </MenuItem>
                <MenuItem
                  _focus={{ bg: "gray.700" }}
                  p='0'
                  onClick={() =>
                    filtrarPorMes("2022-06-01", "2022-06-30", "Junio")
                  }
                >
                  <Box fontSize='lg' w='100%' p='5px 10px'>
                    Junio 2022
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
        <Box
          mt={6}
          p={2}
          border='1px solid #4A5568'
          borderRadius='8px'
          maxW='1250px'
          mx={{ base: 6, md: "auto" }}
          mb='40px'
        >
          <TableContainer>
            <Table size='md' variant='simple' fontWeight='bold'>
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th textAlign='center'>Categoría</Th>
                  <Th textAlign='center'>Importe</Th>
                  <Th textAlign='center'>Operación</Th>
                  <Th textAlign='center'>Adjunto</Th>
                  <Th>Descripción</Th>
                  <Th>Usuario</Th>
                </Tr>
              </Thead>
              <Tbody color='#CBD5E0'>
                {dataFiltrada.map((operacion) => (
                  <Tr key={operacion.id}>
                    <Td>
                      {`${format(
                        new Date(
                          `${operacion.properties.Fecha_operacion.date.start} GMT-0500`
                        ),
                        "dd MMM yyyy"
                      )}`}
                    </Td>
                    <Td textAlign='center'>
                      {operacion.properties.Categoria.select.name}
                    </Td>
                    <Td fontWeight='bold' textAlign='center'>
                      S/. {operacion.properties.Importe.number}
                    </Td>

                    <Td textAlign='center'>
                      <Tag
                        colorScheme={`${
                          operacion.properties.Operacion.select.name ==
                          "Ingreso"
                            ? "teal"
                            : "red"
                        }`}
                        variant='solid'
                      >
                        {operacion.properties.Operacion.select.name}
                      </Tag>
                    </Td>

                    <Td textAlign='center'>
                      {operacion.properties.Adjunto.rich_text[0]?.plain_text ? (
                        <ModalImagenAdjunta
                          imagen={
                            operacion.properties.Adjunto.rich_text[0]
                              ?.plain_text
                          }
                        />
                      ) : (
                        "-"
                      )}
                    </Td>

                    <Td maxW='150px' textAlign='center'>
                      {operacion.properties.Descripcion.rich_text[0]
                        .plain_text == "-" ? (
                        "-"
                      ) : (
                        <ModalDescripcion
                          descripcion={
                            operacion.properties.Descripcion.rich_text[0]
                              .plain_text
                          }
                        />
                      )}
                    </Td>
                    <Td>{operacion.properties.Usuario.title[0].plain_text}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Fecha</Th>
                  <Th textAlign='center'>Categoría</Th>
                  <Th isNumeric>Importe</Th>
                  <Th textAlign='center'>Operación</Th>
                  <Th textAlign='center'>Adjunto</Th>
                  <Th>Descripción</Th>
                  <Th>Usuario</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          {/* <Button onClick={() => filtrarPorMes(6, "2022")} colorScheme='green'>
            Junio
          </Button> */}
        </Box>
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
