import { Client } from "@notionhq/client";
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  try {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    // Run cors
    await cors(req, res);

    // Get data submitted in request's body.
    const body = req.body;

    const new_lead = {
      parent: {
        database_id: process.env.NOTION_CHIFLES_DATABASE_ID,
      },
      properties: {
        Usuario: {
          title: [
            {
              text: {
                content: body.usuario ? body.usuario : "",
              },
            },
          ],
        },
        Importe: {
          number: body.importe ? body.importe : 0,
        },
        Operacion: {
          select: {
            name: body.operacion ? body.operacion : "",
          },
        },
        Categoria: {
          select: {
            name: body.categoria ? body.categoria : "",
          },
        },
        Descripcion: {
          rich_text: [
            {
              text: {
                content: body.descripcion ? body.descripcion : "",
              },
            },
          ],
        },
        Adjunto: {
          rich_text: [
            {
              text: {
                content: body.adjunto ? body.adjunto : "",
              },
            },
          ],
        },
      },
    };

    await notion.pages.create(new_lead);

    res.writeHead(301, {
      Location: "/",
    });
    res.end();
  } catch (error) {
    console.log(error);
  }
}
