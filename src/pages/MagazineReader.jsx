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
    #flipbook {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    .page-wrapper {
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .page {
      box-shadow: 0 0 5px rgba(0,0,0,0.2);
      background: #fff;
    }

    #single-page-wrapper {
      display: none;
      justify-content: center;
    }

    .controls {
      margin-top: 20px;
      text-align: center;
    }

    .controls button {
      margin: 0 5px;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      background-color: #ffdf91;
      color: #8b5e3c;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .controls button:hover {
      background-color: #ffd661;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }

    .controls input {
      width: 90px;
      text-align: center;
      border: 2px solid #ffdf91;
      background-color: #fff8e5;
      border-radius: 8px;
      font-weight: 600;
      color: #8b5e3c;
      padding: 10px;
      transition: all 0.2s ease;
    }

    .controls input:focus {
      outline: none;
      box-shadow: 0 0 8px rgba(255, 223, 145, 0.8);
      border-color: #ffd661;
    }

    @media (max-width: 768px) {
      .controls button, .controls input {
        margin: 5px 2px;
        padding: 8px 12px;
        width: auto;
      }

      #flipbook {
        flex-direction: column;
        gap: 20px;
      }
    }
  </style>

  <div id="single-page-wrapper" class="page-wrapper">
    <div id="single-page" class="page"></div>
  </div>

  <div id="flipbook">
    <div class="page-wrapper">
      <div id="left-page" class="page"></div>
    </div>
    <div class="page-wrapper">
      <div id="right-page" class="page"></div>
    </div>
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

  // currentPage: hvis spread => venstre side, hvis single => den viste side
  let currentPage = 1;      // start på forsiden
  let singleMode = true;    // forside vises alene

  const leftPage = document.getElementById("left-page");
  const rightPage = document.getElementById("right-page");
  const flipbook = document.getElementById("flipbook");
  const singleWrap = document.getElementById("single-page-wrapper");
  const singlePage = document.getElementById("single-page");
  const pageInput = document.getElementById("pageInput");
  const goToPageBtn = document.getElementById("goToPage");

  function getScale(pageWidth) {
    return (container.offsetWidth / 2 - 20) / pageWidth;
  }

  window.addEventListener("resize", renderPages);

  pdfjsLib.getDocument(fileUrl).promise
    .then((pdf) => {
      pdfDoc = pdf;
      renderPages();
    })
    .catch((err) => alert("Fejl ved indlæsning af PDF: " + err.message));

  // Helper: hop til korrekt visning for et givent side-nummer
  function jumpTo(pageNum) {
    if (!pdfDoc) return;

    const N = pdfDoc.numPages;
    let p = Math.max(1, Math.min(pageNum, N));

    if (p === 1) {
      currentPage = 1;
      singleMode = true;
    } else if (p === N) {
      currentPage = N;
      singleMode = true;
    } else if (N % 2 === 1 && p === N - 1) {
      // ulige antal sider → næstsidste side står alene
      currentPage = N - 1;
      singleMode = true;
    } else {
      // opslag: venstre = lige side, højre = venstre+1
      const left = p % 2 === 0 ? p : p - 1;
      currentPage = Math.max(2, Math.min(left, N - 1)); // sikkerhed
      singleMode = false;
    }

    renderPages();
  }

  // Gå til side (input)
  goToPageBtn.addEventListener("click", () => {
    const val = parseInt(pageInput.value);
    if (isNaN(val)) return alert("Indtast et gyldigt tal!");
    jumpTo(val);
  });

  // NEXT
  document.getElementById("next").addEventListener("click", () => {
    if (!pdfDoc) return;
    const N = pdfDoc.numPages;

    if (singleMode) {
      if (currentPage === 1) {
        if (N === 1) {
          // intet at gøre
        } else if (N === 2 || N === 3) {
          // 2: direkte til bagside, 3: vis side 2 alene (så 3 kan være bagside alene)
          currentPage = N === 2 ? 2 : 2;
          singleMode = true;
        } else {
          // normal → første opslag 2–3
          currentPage = 2;
          singleMode = false;
        }
      } else if (currentPage === N - 1) {
        // næstsidste single → bagside single
        currentPage = N;
        singleMode = true;
      } else if (currentPage === N) {
        // allerede på bagsiden
      } else {
        // fallback (meget lille N): næste side
        currentPage = Math.min(currentPage + 1, N);
        singleMode = true;
      }
    } else {
      // spread-mode
      const nextLeft = currentPage + 2;
      if (nextLeft === N - 1) {
        // ulige N → vis næstsidste single
        currentPage = N - 1;
        singleMode = true;
      } else if (nextLeft <= N - 2) {
        // næste opslag
        currentPage = nextLeft;
        singleMode = false;
      } else {
        // næste = bagside single
        currentPage = N;
        singleMode = true;
      }
    }

    renderPages();
  });

  // PREV
  document.getElementById("prev").addEventListener("click", () => {
    if (!pdfDoc) return;
    const N = pdfDoc.numPages;

    if (singleMode) {
      if (currentPage === 1) {
        // forside → bliver stående
      } else if (currentPage === N) {
        // fra bagsiden
        if (N % 2 === 0) {
          // lige antal → tilbage til sidste opslag (N-2, N-1)
          currentPage = N - 2 >= 2 ? N - 2 : 1;
          singleMode = currentPage === 1 ? true : false;
        } else {
          // ulige antal → tilbage til næstsidste single (N-1)
          currentPage = N - 1;
          singleMode = true;
        }
      } else if (currentPage === N - 1) {
        // fra næstsidste single (kun ved ulige N)
        if (N - 3 >= 2) {
          currentPage = N - 3; // tilbage til forrige opslag
          singleMode = false;
        } else {
          currentPage = 1; // små dokumenter → forside
          singleMode = true;
        }
      } else if (currentPage === 2) {
        // små docs (N=3) → tilbage til forside
        currentPage = 1;
        singleMode = true;
      } else {
        // fallback: tilbage til forside
        currentPage = 1;
        singleMode = true;
      }
    } else {
      // spread-mode
      if (currentPage <= 2) {
        currentPage = 1;
        singleMode = true;
      } else {
        currentPage = currentPage - 2;
        singleMode = false;
      }
    }

    renderPages();
  });

  function renderPages() {
    if (!pdfDoc) return;

    // opdater input så man kan se hvor man er
    if (singleMode) {
      pageInput.value = String(currentPage);
    } else {
      pageInput.value = String(currentPage); // venstre side nr.
    }

    if (singleMode) {
      flipbook.style.display = "none";
      singleWrap.style.display = "flex";
      renderPage(currentPage, singlePage, 0.95);
      return;
    }

    // opslag
    singleWrap.style.display = "none";
    flipbook.style.display = "flex";
    renderPage(currentPage, leftPage);
    renderPage(currentPage + 1, rightPage);
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

      page
        .render({ canvasContext: ctx, viewport: scaledViewport })
        .promise.then(() => {
          container.appendChild(canvas);
        });
    });
  }
}

export default MagazineReader;
