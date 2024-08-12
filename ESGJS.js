// 引入 PDFJS
import * as PDFJS from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs";

// 手动设置 workerSrc 路徑
PDFJS.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.mjs";

const pdfUrl = "./PDFTest/測試PDF.pdf"; // PDF 文件的路徑

function updatePreview() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const summary = document.getElementById('summary').value;

    document.getElementById('preview-name').textContent = name;
    document.getElementById('preview-phone').textContent = phone;
    document.getElementById('preview-email').textContent = email;
    document.getElementById('preview-summary').textContent = summary;
}

function ShowPDF() {
    PDFJS.getDocument(pdfUrl).promise.then((pdfDoc) => {
        const totalPages = pdfDoc.numPages;
        const canvasContainer = document.getElementById("canvasContainer");
        canvasContainer.innerHTML = '';  // 清空之前的内容
        for (let i = 1; i <= totalPages; i++) {
            pdfDoc.getPage(i).then((page) => {
                let viewport = page.getViewport({ scale: 1.5 });
                let canvas = document.createElement("canvas");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                let context = canvas.getContext("2d");

                let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).promise.then(() => {});

                canvasContainer.appendChild(canvas);
            });
        }
    });
}

window.onload = function() {
    ShowPDF();
};

  // 确保editPDF被成功调用
  document.getElementById('downloadBtn').addEventListener('click', (event) => {
    event.preventDefault();  // 阻止表单的提交動作

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const summary = document.getElementById('summary').value;

    console.log("Name:", name);       // 调试信息
    console.log("Email:", email);     // 调试信息
    console.log("Summary:", summary); // 调试信息

    fetch('./PDFTest/測試PDF.pdf')
        .then(response => response.arrayBuffer())
        .then(pdfBytes => {
            // 调用 editPDF 函数修改 PDF 並下載
            editPDF(pdfBytes, name, email, summary);
        })
        .catch(error => {
            console.error('Error fetching PDF:', error);
        });
});