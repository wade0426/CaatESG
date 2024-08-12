async function editPDF(pdfBytes, name, email, summary) {
    try {
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

        // 從 Google Fonts 加載 Noto Sans TC 字體
        const fontUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap';
        const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
        const customFont = await pdfDoc.embedFont(fontBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        
        const fontSize = 12;
        firstPage.drawText(name, {
            x: 50,
            y: firstPage.getHeight() - 50,
            size: fontSize,
            font: customFont,
            color: PDFLib.rgb(0, 0, 0),
        });

        firstPage.drawText(email, {
            x: 50,
            y: firstPage.getHeight() - 80,
            size: fontSize,
            font: customFont,
            color: PDFLib.rgb(0, 0, 0),
        });

        firstPage.drawText(summary, {
            x: 50,
            y: firstPage.getHeight() - 110,
            size: fontSize,
            font: customFont,
            color: PDFLib.rgb(0, 0, 0),
        });

        // 保存修改後的 PDF 文件
        const modifiedPdfBytes = await pdfDoc.save();
        const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        saveAs(blob, '修改後的履歷.pdf');
    } catch (error) {
        console.error('Error modifying PDF:', error);
    }
}
