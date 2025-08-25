import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function MagazineReader() {
  const { id } = useParams();
  const containerRef = useRef(null);
  const [file, setFile] = useState(null);

  const fileMap = {
    1: "/magazines/udgave1.pdf",
    2: "/magazines/udgave2.pdf",
    3: "/magazines/udgave3.pdf",
  };

  useEffect(() => {
    const pdfFile = fileMap[id];
    if (!pdfFile) return alert("Magasinet findes ikke.");
    setFile(pdfFile);
  }, [id]);

  useEffect(() => {
    if (!file) return;

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => initMagazineViewer(file, containerRef.current);
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, [file]);

  return (
    <div ref={containerRef} className="px-6 py-12 bg-[#8b5e3c] min-h-screen">
      <div dangerouslySetInnerHTML={{ __html: viewerHTML }} />
    </div>
  );
}

const viewerHTML = `
<style>
  #flipbook { display: flex; justify-content: center; gap: 10px; }
  .page-wrapper { display: flex; justify-content: center; align-items: flex-start; }
  .page { box-shadow: 0 0 5px rgba(0,0,0,0.2); background: #fff; }
  #single-page-wrapper { display: none; justify-content: center; }
  .page canvas { max-width: 100%; height: auto; display: block; }
  .controls { margin-top: 20px; text-align: center; }
  .controls button {
    margin: 0 5px; padding: 10px 16px; border: none; border-radius: 8px;
    font-weight: 600; background-color: #ffdf91; color: #8b5e3c;
    cursor: pointer; transition: all 0.2s ease;
  }
  .controls button:hover { background-color: #ffd661; transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
  .controls input {
    width: 90px; text-align: center; border: 2px solid #ffdf91; background-color: #fff8e5;
    border-radius: 8px; font-weight: 600; color: #8b5e3c; padding: 10px; transition: all 0.2s ease;
  }
  .controls input:focus { outline: none; box-shadow: 0 0 8px rgba(255, 223, 145, 0.8); border-color: #ffd661; }
  @media (max-width: 768px) {
    #flipbook { flex-direction: column; gap: 20px; }
    .controls button, .controls input { margin: 5px 2px; padding: 8px 12px; width: auto; }
  }
</style>

<div id="single-page-wrapper" class="page-wrapper"><div id="single-page" class="page"></div></div>
<div id="flipbook">
  <div class="page-wrapper"><div id="left-page" class="page"></div></div>
  <div class="page-wrapper"><div id="right-page" class="page"></div></div>
</div>

<div class="controls">
  <button id="prev">◀️ Forrige</button>
  <input type="number" id="pageInput" min="1" placeholder="Skriv sidenr." />
  <button id="goToPage">Gå til side</button>
  <button id="next">Næste ▶️</button>
</div>
`;

function initMagazineViewer(fileUrl, container) {
  const pdfjsLib = window["pdfjs-dist/build/pdf"];
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  let pdfDoc = null;
  let currentPage = 1;

  const leftPage = document.getElementById("left-page");
  const rightPage = document.getElementById("right-page");
  const flipbook = document.getElementById("flipbook");
  const singleWrap = document.getElementById("single-page-wrapper");
  const singlePage = document.getElementById("single-page");
  const pageInput = document.getElementById("pageInput");
  const goToPageBtn = document.getElementById("goToPage");

  const isMobile = () => container.clientWidth <= 768;

  const getScale = (pageWidth) => {
    const maxWidth = isMobile() ? container.clientWidth * 0.95 : container.clientWidth / 2 - 20;
    return Math.min(maxWidth / pageWidth, 1);
  };

  window.addEventListener("resize", renderPages);

  pdfjsLib.getDocument(fileUrl).promise
    .then((pdf) => { pdfDoc = pdf; renderPages(); })
    .catch((err) => alert("Fejl ved indlæsning af PDF: " + err.message));

  goToPageBtn.addEventListener("click", () => {
    const val = parseInt(pageInput.value);
    if (isNaN(val)) return alert("Indtast et gyldigt tal!");
    currentPage = Math.max(1, Math.min(val, pdfDoc.numPages));
    renderPages();
  });

  document.getElementById("next").addEventListener("click", () => {
    if (!pdfDoc) return;
    const N = pdfDoc.numPages;

    if (isMobile()) {
      if (currentPage < N) currentPage++;
    } else {
      if (currentPage === 1) currentPage = N > 3 ? 2 : 2;
      else if (currentPage >= N - 1) currentPage = N;
      else currentPage += 2;
    }
    renderPages();
  });

  document.getElementById("prev").addEventListener("click", () => {
    if (!pdfDoc) return;

    if (isMobile()) {
      if (currentPage > 1) currentPage--;
    } else {
      if (currentPage <= 2) currentPage = 1;
      else currentPage -= 2;
    }
    renderPages();
  });

  function renderPages() {
    if (!pdfDoc) return;

    const N = pdfDoc.numPages;

    if (isMobile()) {
      // Mobil: altid single-page
      singleWrap.style.display = "flex";
      flipbook.style.display = "none";
      renderPage(currentPage, singlePage, 0.95);
      pageInput.value = currentPage;
      return;
    }

    // Desktop
    if (currentPage === 1 || currentPage === N) {
      // Forside eller bagside vises alene
      singleWrap.style.display = "flex";
      flipbook.style.display = "none";
      renderPage(currentPage, singlePage, 0.95);
    } else {
      // Resten: to-sider spread
      singleWrap.style.display = "none";
      flipbook.style.display = "flex";
      renderPage(currentPage, leftPage);
      renderPage(currentPage + 1, rightPage);
    }

    pageInput.value = currentPage;
  }

  function renderPage(pageNum, container, fixedScale) {
    container.innerHTML = "";
    if (!pageNum || !pdfDoc || pageNum > pdfDoc.numPages) return;

    pdfDoc.getPage(pageNum).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      const scale = fixedScale || getScale(viewport.width);
      const scaledViewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      const ctx = canvas.getContext("2d");

      page.render({ canvasContext: ctx, viewport: scaledViewport }).promise.then(() => {
        container.appendChild(canvas);
        canvas.style.maxWidth = "100%";
        canvas.style.height = "auto";
        canvas.style.display = "block";
      });
    });
  }
}

export default MagazineReader;
