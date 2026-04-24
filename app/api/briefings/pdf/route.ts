import { prisma } from '@/lib/prisma';
import PDFDocument from 'pdfkit';

export async function GET() {
  const latest = await prisma.briefing.findFirst({ orderBy: { briefingDate: 'desc' } });
  const doc = new PDFDocument();
  const chunks: Buffer[] = [];

  doc.on('data', (chunk) => chunks.push(chunk));

  if (!latest) {
    doc.fontSize(16).text('No briefings generated yet.');
  } else {
    doc.fontSize(18).text(latest.title);
    doc.moveDown();
    doc.fontSize(12).text(`Date: ${latest.briefingDate.toISOString().slice(0, 10)}`);
    doc.moveDown();
    doc.text(`Summary: ${latest.summary}`);
    doc.moveDown();
    doc.text(`Confirmed Updates: ${latest.confirmedUpdates}`);
    doc.moveDown();
    doc.text(`Early Signals: ${latest.earlySignals}`);
    doc.moveDown();
    doc.text(`Rumors: ${latest.rumors}`);
    doc.moveDown();
    doc.text(`Debunked Items: ${latest.debunkedItems}`);
    doc.moveDown();
    doc.text(`Recommended Tracker Updates: ${latest.recommendedTrackerUpdates}`);
  }

  doc.end();

  const pdf = await new Promise<Buffer>((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="weekly-briefing.pdf"',
    },
  });
}
