/**
 * Skin MBTI Booklet — PDF Generator
 * Usage: node scripts/generate-pdf.js [output-path]
 * Default output: skin_mbti_booklet/SKIN_MBTI_Guide.pdf
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DEFAULT = path.resolve(__dirname, '../skin_mbti_booklet/SKIN_MBTI_Guide.pdf');
const HTML_PATH = path.resolve(__dirname, '../skin_mbti_booklet/index.html');

async function generatePDF(outputPath) {
  console.log('🖨️  Starting PDF generation...');
  console.log(`   Source: ${HTML_PATH}`);
  console.log(`   Output: ${outputPath}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load the HTML file
  const fileUrl = `file:///${HTML_PATH.replace(/\\/g, '/')}`;
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  // Wait for JS rendering to complete
  await page.waitForSelector('#ch05', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 2000)); // extra buffer for dynamic content

  // Generate PDF with A4 settings
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      right: '20mm',
      bottom: '15mm',
      left: '20mm'
    },
    displayHeaderFooter: false,
    preferCSSPageSize: false,
    timeout: 60000
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(1);
  console.log(`✅ PDF generated: ${outputPath} (${sizeMB} MB)`);
}

// Main
const outputPath = process.argv[2] || OUTPUT_DEFAULT;
generatePDF(outputPath).catch(err => {
  console.error('❌ PDF generation failed:', err.message);
  process.exit(1);
});
