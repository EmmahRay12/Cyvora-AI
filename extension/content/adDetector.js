console.log("Ad Detector Loaded");

const ads = [];

// iframe ads

document.querySelectorAll("iframe").forEach(() => {
    ads.push("Embedded Advertisement");
});

// Google Ads

if (document.body.innerHTML.toLowerCase().includes("adsbygoogle")) {
    ads.push("Google Ads");
}

// Banner Ads

document.querySelectorAll("img").forEach(img => {

    const src = img.src.toLowerCase();

    if (
        src.includes("ad") ||
        src.includes("banner") ||
        src.includes("advert")
    ) {
        ads.push("Banner Advertisement");
    }

});

// Popups

document.querySelectorAll("[class],[id]").forEach(el => {

    const text =
        (el.className + " " + el.id).toLowerCase();

    if (
        text.includes("popup") ||
        text.includes("modal")
    ) {
        ads.push("Popup");
    }

});

chrome.runtime.sendMessage({

    type: "ADS",

    ads: [...new Set(ads)]

});