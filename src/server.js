import express from 'express';
import cors from 'cors';
import { generateTemplate } from './template.js';
import { handlePdfRequest } from './handlers.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/generate-pdf', handlePdfRequest);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});