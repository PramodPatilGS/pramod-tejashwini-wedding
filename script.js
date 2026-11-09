/* =========================================
   WEDDING INVITATION JAVASCRIPT
========================================= */


/* =========================================
   WEDDING MUSIC
========================================= */

const weddingMusic = new Audio("music/wedding.mp3");

weddingMusic.loop = true;
weddingMusic.volume = 0.35;


/* =========================================
   OPEN INVITATION
========================================= */

function openInvitation() {
    createFlowerShower();

    const openingScreen =
        document.getElementById("openingScreen");

    const mainWebsite =
        document.getElementById("mainWebsite");

    /* Start music */

    weddingMusic.play().then(() => {

        document
            .getElementById("musicControl")
            .classList.add("playing");

    }).catch(() => {

        console.log(
            "Music playback was blocked by the browser."
        );

    });


    /* Fade opening screen */

    openingScreen.classList.add("opening-hide");


    /* Reveal website */

    setTimeout(() => {

        mainWebsite.classList.add("website-show");

    }, 500);

}


/* =========================================
   PLAY / PAUSE MUSIC
========================================= */

function toggleMusic() {

    const musicIcon =
        document.getElementById("musicIcon");

    const musicControl =
        document.getElementById("musicControl");


    if (weddingMusic.paused) {

        weddingMusic.play();

        musicIcon.innerHTML = "♫";

        musicControl.classList.add("playing");

    } else {

        weddingMusic.pause();

        musicIcon.innerHTML = "🔇";

        musicControl.classList.remove("playing");

    }

}


/* =========================================
   COUNTDOWN
========================================= */

function updateCountdown() {

    const weddingDate =
        new Date("November 15, 2026 11:30:00").getTime();

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById("days").innerText = "00";

        document.getElementById("hours").innerText = "00";

        document.getElementById("minutes").innerText = "00";

        document.getElementById("seconds").innerText = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


/* =========================================
   START COUNTDOWN
========================================= */

updateCountdown();

setInterval(updateCountdown, 1000);
/* =========================================
   FLOWER SHOWER EFFECT
========================================= */

function createFlowerShower() {

    const container =
        document.getElementById("flowerContainer");

    const flowers = [
        "🌸",
        "🌺",
        "🌼",
        "🌷",
        "✿",
        "❀"
    ];

    /* Create 45 petals */

    for (let i = 0; i < 45; i++) {

        const petal =
            document.createElement("span");

        petal.classList.add("flower-petal");

        petal.innerHTML =
            flowers[
                Math.floor(
                    Math.random() * flowers.length
                )
            ];

        /* Random horizontal position */

        petal.style.left =
            Math.random() * 100 + "%";


        /* Random size */

        petal.style.fontSize =
            (14 + Math.random() * 16) + "px";


        /* Random falling speed */

        petal.style.animationDuration =
            (3 + Math.random() * 3) + "s";


        /* Random delay */

        petal.style.animationDelay =
            (Math.random() * 0.8) + "s";


        container.appendChild(petal);


        /* Remove after animation */

        setTimeout(() => {

            petal.remove();

        }, 6500);

    }

}

/* =========================================
   PHOTO BOOTH + SHARED SUPABASE LIKES
   Existing invitation code above is unchanged.
========================================= */

const SUPABASE_URL = "https://nugjcurxsxojiufcihnd.supabase.co";
// Paste your Supabase publishable key between the quotes below.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_NltaR-Wnxae7cvU5GjsdJg_9j_YPHJa";

const photoBoothPhotos = Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return { id: `photo-${number}`, src: `photos/photo-${number}.jpg`, alt: `Vyshna and Mahesh wedding photo ${index + 1}`, caption: `Moment ${number}` };
});

const photoBoothGrid = document.getElementById("photoBoothGrid");
const photoBoothStatus = document.getElementById("photoBoothStatus");
const likedPhotosStorageKey = "vyshna-mahesh-photo-likes-v1";

function getLocallyLikedPhotos() {
    try { return JSON.parse(localStorage.getItem(likedPhotosStorageKey) || "[]"); }
    catch (error) { return []; }
}

function saveLocallyLikedPhoto(photoId) {
    const liked = getLocallyLikedPhotos();
    if (!liked.includes(photoId)) liked.push(photoId);
    try { localStorage.setItem(likedPhotosStorageKey, JSON.stringify(liked)); } catch (error) {}
}

function supabaseHeaders() {
    return { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`, "Content-Type": "application/json" };
}

function isSupabaseConfigured() {
    return Boolean(SUPABASE_PUBLISHABLE_KEY) && !SUPABASE_PUBLISHABLE_KEY.includes("PASTE_YOUR_");
}

function renderPhotoBooth(likeCounts = {}) {
    if (!photoBoothGrid) return;
    const locallyLiked = getLocallyLikedPhotos();
    photoBoothGrid.innerHTML = "";
    photoBoothPhotos.forEach((photo) => {
        const card = document.createElement("article");
        card.className = "photo-booth-card";
        const image = document.createElement("img");
        image.className = "photo-booth-image";
        image.src = photo.src; image.alt = photo.alt; image.loading = "lazy";
        image.addEventListener("error", () => {
            image.alt = `${photo.alt} — image file not found`; image.style.objectFit = "contain"; image.style.padding = "18px"; image.style.minHeight = "180px";
            image.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="100%" height="100%" fill="#eee4d6"/><text x="50%" y="46%" text-anchor="middle" font-family="Arial" font-size="18" fill="#6f4437">Photo not found</text><text x="50%" y="54%" text-anchor="middle" font-family="Arial" font-size="13" fill="#6f4437">${photo.src}</text></svg>`);
        }, { once: true });
        const footer = document.createElement("div"); footer.className = "photo-booth-card-footer";
        const caption = document.createElement("span"); caption.className = "photo-booth-caption"; caption.textContent = photo.caption;
        const likeButton = document.createElement("button");
        likeButton.type = "button"; likeButton.className = "photo-like-button"; likeButton.dataset.photoId = photo.id;
        likeButton.innerHTML = `<span aria-hidden="true">${locallyLiked.includes(photo.id) ? "♥" : "♡"}</span><span class="like-count">${Number(likeCounts[photo.id] || 0)}</span>`;
        likeButton.setAttribute("aria-label", `Like ${photo.alt}`);
        if (locallyLiked.includes(photo.id)) { likeButton.classList.add("is-liked"); likeButton.title = "You've already liked this photo on this browser"; }
        likeButton.addEventListener("click", () => handlePhotoLike(photo.id, likeButton));
        footer.append(caption, likeButton); card.append(image, footer); photoBoothGrid.appendChild(card);
    });
}

async function loadSharedPhotoLikes() {
    if (!isSupabaseConfigured()) {
        renderPhotoBooth();
        if (photoBoothStatus) photoBoothStatus.textContent = "Gallery preview is ready. Add your Supabase publishable key in script.js to enable shared like counts.";
        return;
    }
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/photo_likes?select=photo_id,likes&order=photo_id.asc`, { headers: supabaseHeaders() });
        if (!response.ok) throw new Error(`Could not load likes (${response.status})`);
        const rows = await response.json();
        const counts = Object.fromEntries(rows.map((row) => [row.photo_id, Number(row.likes)]));
        renderPhotoBooth(counts);
        if (photoBoothStatus) photoBoothStatus.textContent = "Like counts are shared with other guests. Each browser can like each photo once.";
    } catch (error) {
        renderPhotoBooth();
        if (photoBoothStatus) photoBoothStatus.textContent = "The photos are ready, but shared likes could not load. Check the Supabase key and connection.";
        console.error("Photo booth likes could not be loaded:", error);
    }
}

async function handlePhotoLike(photoId, button) {
    if (getLocallyLikedPhotos().includes(photoId)) {
        if (photoBoothStatus) photoBoothStatus.textContent = "You've already liked this photo in this browser. ❤️";
        return;
    }
    if (!isSupabaseConfigured()) {
        if (photoBoothStatus) photoBoothStatus.textContent = "Add your Supabase publishable key in script.js before testing shared likes.";
        return;
    }
    button.disabled = true;
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/like_photo`, { method: "POST", headers: supabaseHeaders(), body: JSON.stringify({ p_photo_id: photoId }) });
        if (!response.ok) throw new Error(`Like request failed (${response.status}): ${await response.text()}`);
        const newCount = await response.json();
        saveLocallyLikedPhoto(photoId); button.classList.add("is-liked");
        button.querySelector("span").textContent = "♥"; button.querySelector(".like-count").textContent = String(Number(newCount));
        button.title = "You've liked this photo";
        if (photoBoothStatus) photoBoothStatus.textContent = "Your heart has been added! ❤️";
    } catch (error) {
        if (photoBoothStatus) photoBoothStatus.textContent = "Couldn't save that like right now. Please try again.";
        console.error("Photo like failed:", error);
    } finally { button.disabled = false; }
}

if (photoBoothGrid) { renderPhotoBooth(); loadSharedPhotoLikes(); }

/* Stop wedding music when opening Maps or Calendar */

document.addEventListener("click", function (event) {
    const link = event.target.closest("a[href]");

    if (!link) return;

    const url = link.href;

    const isMapsLink = url.includes("google.com/maps");
    const isCalendarLink = url.includes("calendar.google.com");

    if (isMapsLink || isCalendarLink) {
        weddingMusic.pause();
        weddingMusic.currentTime = 0;

        const musicControl = document.getElementById("musicControl");
        const musicIcon = document.getElementById("musicIcon");

        if (musicControl) {
            musicControl.classList.remove("playing");
        }

        if (musicIcon) {
            musicIcon.innerHTML = "🔇";
        }
    }
});
