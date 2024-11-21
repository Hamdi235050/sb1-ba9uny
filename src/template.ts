export function generateTemplate(pdfUrl: string): string {
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
    <title>PDF Viewer</title>
    <script type="application/json" id="pdf-data">
        ${JSON.stringify(templateData, null, 2)}
    </script>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f5f5f5;
        }
        .pdf-container {
            width: 21cm;
            height: 29.7cm;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div class="pdf-container">
        <iframe src="${pdfUrl}" type="application/pdf"></iframe>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const pdfData = JSON.parse(document.getElementById('pdf-data').textContent);
            console.log('PDF Template Data:', pdfData);
        });
    </script>
</body>
</html>
  `.trim();
}