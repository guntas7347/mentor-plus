import { PDFDocument, rgb, degrees } from "pdf-lib";

export async function addWatermark(arrayBuffer: ArrayBuffer, text: string) {
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();

    page.drawText(text, {
      x: width / 4,
      y: height / 2,
      size: 40,
      color: rgb(0.75, 0.75, 0.75),
      rotate: degrees(45),
      opacity: 0.3,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
