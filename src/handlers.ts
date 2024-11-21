import { generateTemplate } from "./template.ts";
import { validateUrl } from "./utils.ts";

export async function handlePdfRequest(request: Request): Promise<Response> {
  try {
    const { pdfUrl } = await request.json();

    if (!pdfUrl || !validateUrl(pdfUrl)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing PDF URL" }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const template = generateTemplate(pdfUrl);

    return new Response(
      JSON.stringify({
        success: true,
        template,
        metadata: {
          url: pdfUrl,
          timestamp: new Date().toISOString(),
          format: "A4"
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}