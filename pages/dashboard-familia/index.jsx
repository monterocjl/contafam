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
} from "@chakra-ui/react";
import Layout from "../../Components/Layout/Layout";
import Totales from "../../Components/Totales/Totales";
import { format } from "date-fns";
import ModalImagenAdjunta from "../../Components/ModalImagenAdjunta/ModalImagenAdjunta";
import ModalDescripcion from "../../Components/ModalDescripcion/ModalDescripcion";

export default function Index({ data }) {
  const [dataFiltrada, setDataFiltrada] = useState("");

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
                {data.map((operacion) => (
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
