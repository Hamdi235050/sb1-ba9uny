import { generateTemplate } from './template.js';
import { validateUrl } from './utils.js';
import { generatePdf } from './pdf-generator.js';

export async function handlePdfRequest(req, res) {
  try {
    const { pdfUrl } = req.body;

    if (!pdfUrl || !validateUrl(pdfUrl)) {
      return res.status(400).json({ 
        error: "Invalid or missing PDF URL" 
      });
    }

    const template = generateTemplate(pdfUrl);
    const pdfBuffer = await generatePdf(template);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
    res.send(pdfBuffer);
    
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
}