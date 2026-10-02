// Vinduets dele, hentet via deres id
const win = document.getElementById("window");
const title = document.getElementById("window-title");
const content = document.getElementById("window-content");
const closeButton = document.getElementById("window-close");

const imagePreview = document.getElementById("image-preview");
const previewImage = document.getElementById("image-preview-img");
const previewTitle = document.getElementById("image-preview-title");

// Husker hvilken mappe der åbnede vinduet
let lastFolder = null;
let lastImageButton = null;

// Åbn mapper og skift mellem projekternes visninger.
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-window]");
    if (!btn) return;

    const template = document.getElementById(btn.dataset.window);
    if (!template) return;


    if (btn.classList.contains("folder")) lastFolder = btn;


    content.replaceChildren(template.content.cloneNode(true));
    win.dataset.content = btn.dataset.window;
    title.textContent = btn.dataset.title || btn.textContent.trim();
    win.hidden = false;
    content.scrollTop = 0;

    // Flyt fokus til den nye visning.
    if (btn.dataset.window === "lakal") {
        content.querySelector(".project-title").focus();
    } else if (btn.classList.contains("project-back")) {
        content.querySelector(".project-open").focus();
    } else {
        closeButton.focus();
    }
});

function closeWindow() {
    win.hidden = true;
    lastFolder?.focus();
}

closeButton.addEventListener("click", closeWindow);

// Escape lukker billedet først. Ellers lukker vinduet
document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || imagePreview.open) return;
    if (!win.hidden) closeWindow();
});

// Billedeknapperne kommer fra templaten, så vi lytter på siden.
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-image]");
    if (!btn) return;

    const img = btn.querySelector("img");
    previewImage.src = img.src;
    previewImage.alt = img.alt;
    previewTitle.textContent = btn.dataset.image;
    lastImageButton = btn;

    imagePreview.showModal();
});

document.getElementById("image-preview-close").addEventListener("click", () => {
    imagePreview.close();
});

imagePreview.addEventListener("click", (e) => {
    if (e.target === imagePreview) imagePreview.close();
});

imagePreview.addEventListener("close", () => {
    lastImageButton?.focus();
});

const zoomIn = document.getElementById("image-zoom-in");
const zoomOut = document.getElementById("image-zoom-out");
const zoomLevel = document.getElementById("image-zoom-level");

let zoomPercent = 100;
let imageWidth = 0;

function changeImageZoom(change) {
    if (zoomPercent === 100) {
        imageWidth = previewImage.clientWidth;

        const imageBody = imagePreview.querySelector(".image-preview-body");
        imageBody.style.height = `${imageBody.getBoundingClientRect().height}px`;
    }

    zoomPercent = Math.min(600, Math.max(100, zoomPercent + change));

    imagePreview.classList.toggle("is-zoomed", zoomPercent !== 100);

    previewImage.style.width = zoomPercent === 100
        ? ""
        : `${imageWidth * zoomPercent / 100}px`;

    zoomLevel.textContent = `${zoomPercent}%`;
    zoomOut.disabled = zoomPercent === 100;
    zoomIn.disabled = zoomPercent === 600;
}

zoomIn.addEventListener("click", () => changeImageZoom(50));
zoomOut.addEventListener("click", () => changeImageZoom(-50));

// Hvert nyt billede starter i den tilpassede visning.
imagePreview.addEventListener("close", () => {
    zoomPercent = 100;
    previewImage.style.width = "";
    imagePreview.querySelector(".image-preview-body").style.height = "";
    imagePreview.classList.remove("is-zoomed");
    zoomLevel.textContent = "100%";
    zoomIn.disabled = false;
    zoomOut.disabled = true;
});


// Startskærm.
const splash = document.getElementById("splash");

function hideSplash() {
    splash.remove();
}

setTimeout(hideSplash, 1400);
document.getElementById("splash-skip").addEventListener("click", hideSplash);