import { serve } from "std/http/server.ts";
import { generateTemplate } from "./template.ts";
import { handlePdfRequest } from "./handlers.ts";

const port = 8000;

const handler = async (request: Request): Promise<Response> => {
  if (request.method === "POST") {
    return await handlePdfRequest(request);
  }

  return new Response("Method not allowed", { status: 405 });
};

console.log(`Server running on http://localhost:${port}`);
await serve(handler, { port });