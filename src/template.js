export function generateTemplate(pdfUrl) {
  const templateData = {
    url: pdfUrl,
    timestamp: new Date().toISOString(),
    settings: {
      format: "A4",
      margin: "1cm"
    }
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Document</title>
    <script type="application/json" id="pdf-data">
        ${JSON.stringify(templateData, null, 2)}
    </script>
    <style>
        @page {
            margin: 0;
        }
        body {
            margin: 0;
            padding: 2cm;
            font-family: Arial, sans-serif;
        }
        .pdf-container {
            width: 100%;
            height: 100%;
        }
        .pdf-frame {
            width: 100%;
            height: 100%;
            border: none;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .metadata {
            margin-bottom: 2cm;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="metadata">
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <p>Source: ${pdfUrl}</p>
    </div>
    <div class="pdf-container">
        <iframe class="pdf-frame" src="${pdfUrl}" type="application/pdf"></iframe>
    </div>
</body>
</html>
  `.trim();
}