// 第 2 步：设置 workerSrc 地址 （具体包的地址需要依自身项目决定）
import * as PDFJS from "../pdfjs-dist/build/pdf.mjs";
import pdfjsWorker from "../pdfjs-dist/build/pdf.worker.mjs";

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const pdfUrl = "../測試PDF.pdf"; //具体路径由自身项目决定，另外这可能会涉及跨域问题可参照官网解决

console.log(pdfUrl);

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
    
    // 第 3 步：使用 PDFJS.getDocument（） 处理 pdf 文档
    PDFJS.getDocument(pdfUrl).promise.then((pdfDoc) => {
        const totalPages = pdfDoc.numPages; // pdf 的总页数
        const canvasContainer = document.getElementById("canvasContainer"); //html中需创建一个相应的div容器，用于存放canvas元素
        for (let i = 1; i <= totalPages; i++) {
            // 第4步：使用 pdfDoc.getPage（i） 获取第 i 页的数据
            pdfDoc.getPage(i).then((page) => {
                let scaledViewport = page.getViewport({ scale: 1.5 }); //可通过scale来调节初始的缩放比
                //第5步：创建一个 canvas 元素，并设置元素的画布属性
                let canvas = document.createElement("canvas");
                canvas.setAttribute("id", "the-canvas" + i);
                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;
                let context = canvas.getContext("2d");
                let renderContext = {
                    canvasContext: context,
                    viewport: scaledViewport,
                };
                //第 6 步: 使用 page.render 将数据渲染到画布上
                page.render(renderContext).promise.then(() => {});
                canvasContainer.appendChild(canvas); //将canvas元素加入到容器中
            });
        }
    });

    // 作者：forwardXX
    // 链接：https://juejin.cn/post/7143088940953075743
    // 来源：稀土掘金
    // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    
}
window.onload = function() {
        ShowPDF();
    };
