let pictureSrcs = [
    "./assets/img/photo_1_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_2_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_3_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_14_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_5_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_6_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_7_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_19_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_9_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_20_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_13_2025-07-03_22-58-49.jpg",
    "./assets/img/photo_12_2025-07-03_22-58-49.jpg"
]

let pictureTitles = [
    "Mondschein über dem Meer",
    "Straße bei Nacht",
    "Eis an Laterne",
    "Strand",
    "Zug fährt durch herbstlichen Wald",
    "Wald mit Fluss und Bergen",
    "Pflastersteinstraße mit Laub",
    "Straßenbahn bei Nacht",
    "Vogel im Baum",
    "Straßenbahn bei Nacht",
    "Altstadt",
    "Blick durch Kunst auf Meer"
]


function overlayChange() {
    let overlayPicture = document.getElementById('picture-fullsize').getAttribute('src');
    console.log(overlayPicture);

}

function loadPictures() {
    let pictureRef = document.getElementById('pictures');
    pictureRef.innerHTML = "";

    for (let index = 0; index < pictureSrcs.length; index++) {
        pictureRef.innerHTML += getPicTemplateHTML(index);
    }

}

function getPicTemplateHTML(i) {
    return `<img src="${pictureSrcs[i]}" alt="${pictureTitles[i]}" onclick="toggleDialog(${i})" class="pic">`;
}
function toggleDialog(i) {
    let overlayRef = document.getElementById('overlay');
    blurBackground();
    overlayRef.innerHTML = "";
    overlayRef.innerHTML = getOverlayTemplateHTML(i);
    overlayRef.classList.toggle('d_none');
}

function updateOverlay(i) {
    let overlayRef = document.getElementById('overlay');
    overlayRef.innerHTML = getOverlayTemplateHTML(i);

}
function toggleOverlay() {
    let overlayRef = document.getElementById('overlay');
    blurBackground();
    overlayRef.classList.toggle('d_none');

}

function blurBackground() {
    let content = document.getElementById('main_content');
    let overlayRef = document.getElementById('overlay');
    let body = document.getElementById('body')
    if (overlayRef.classList.contains('d_none')) {
        content.classList.toggle('filter')
        body.classList.toggle('noscroll')
    } else {
        content.classList.remove('filter')
        body.classList.toggle('noscroll')
    }
}

function nextPic(i) {
    i++;
    if (i >= pictureSrcs.length) {
        i = 0;
    }
    updateOverlay(i);
}

function beforePic(i) {
    i--;
    if (i < 0) {
        i = pictureSrcs.length - 1;
    }
    updateOverlay(i);
}

function preventBubbling(event) {
    event.stopPropagation();
}



function getOverlayTemplateHTML(i) {
    return `<div class="bigpicture" onclick="preventBubbling(event)">
    <h3>${pictureTitles[i]}</h3>
    <img src="${pictureSrcs[i]}" alt="${pictureTitles[i]}" id="picture-fullsize">
    <div class="overlayText">
        <button id="btnLeft" class="overlayBtn" onclick="beforePic(${i})">
            ⇐
        </button>
        <p style="text-align: center;">
            ${i + 1} / ${pictureSrcs.length}
        </p>
        <button id="btnRight" class="overlayBtn" onclick="nextPic(${i})">
            ⇒
        </button>

    </div>
</div>`
}

