// Vinduets dele, hentet via deres id
const win = document.getElementById("window");
const title = document.getElementById("window-title");
const content = document.getElementById("window-content");

// Husker hvilken mappe der er åbnede vinduet
let lastFolder = null;


// Et klik lytter på hele siden
document.addEventListener("click", (e) => {
    // Fandt klikket en knap med data-window? Ellers: stop
    const btn = e.target.closest("[data-window]");
    if (!btn) return;

    // husk sidste folder, så vi kan fokusere på den igen når vinduet lukkes
    if (btn.classList.contains("folder")) lastFolder = btn;

    // Læg en kopi af templatens med samme navn som kanppens data-window
    const template = document.getElementById(btn.dataset.window);

    // Læg en kopi af templatens indhold ind i vinduet
    content.replaceChildren(template.content.cloneNode(true));

    // Titel = knappens tekst, og vis vinduet
    title.textContent = btn.textContent.trim();
    win.hidden = false;
    document.getElementById("window-close").focus();


});
// Luk vinduet
function closeWindow() {
    win.hidden = true;
    if (lastFolder) lastFolder.focus();
}


// klik på krydset
document.getElementById("window-close").addEventListener("click", closeWindow);

// Tryk på ESC når vinduet er åbent
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !win.hidden) {
        closeWindow();
    }

});

const splash = document.getElementById("splash");

function hideSplash() {
    splash.remove();
}

setTimeout(hideSplash, 1400);
document.getElementById("splash-skip").addEventListener("click", hideSplash
);