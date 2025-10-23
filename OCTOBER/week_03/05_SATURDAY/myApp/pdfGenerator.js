// pdfGenerator.js
import puppeteer from "puppeteer";

export const generateRecipePDF = async (recipeContent) => {
  const html = `
  <html>
  <head>
    <style>
      body {
        font-family: 'Poppins', sans-serif;
        padding: 30px;
        line-height: 1.6;
        background-color: #fafafa;
      }
      h1 {
        text-align: center;
        color: #2b2b2b;
      }
      .section {
        margin-top: 20px;
      }
      .section h2 {
        color: #444;
        border-bottom: 2px solid #ddd;
        padding-bottom: 5px;
      }
      ul { margin-left: 20px; }
    </style>
  </head>
  <body>
    ${recipeContent.replace(/\n/g, "<br>")}
  </body>
  </html>`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();
  return pdfBuffer;
};
