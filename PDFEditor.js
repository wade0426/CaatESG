async function editPDF(pdfBytes, name, email, summary) {
    try {
        // 加载 PDF 文档
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
        const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        
        const fontSize = 12;

        console.log("Drawing text:", name, email, summary); // 调试信息

        firstPage.drawText(name, {
            x: 50,
            y: firstPage.getHeight() - 50,
            size: fontSize,
            font: helveticaFont,
            color: PDFLib.rgb(0, 0, 0),
        });

        firstPage.drawText(email, {
            x: 50,
            y: firstPage.getHeight() - 80,
            size: fontSize,
            font: helveticaFont,
            color: PDFLib.rgb(0, 0, 0),
        });

        firstPage.drawText(summary, {
            x: 50,
            y: firstPage.getHeight() - 110,
            size: fontSize,
            font: helveticaFont,
            color: PDFLib.rgb(0, 0, 0),
        });

        // 保存修改后的 PDF 文档
        const modifiedPdfBytes = await pdfDoc.save();
        console.log("PDF modified successfully"); // 调试信息

        const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        saveAs(blob, '修改後的履歷.pdf');
    } catch (error) {
        console.error('Error modifying PDF:', error);
    }
}