console.log("🛡️ Cyvora AI Content Script Loaded");

// ==========================================
// Tracker Detection
// ==========================================

const trackers = [];

const html = document.documentElement.innerHTML.toLowerCase();

if (html.includes("google-analytics"))
    trackers.push("Google Analytics");

if (html.includes("googletagmanager"))
    trackers.push("Google Tag Manager");

if (html.includes("facebook"))
    trackers.push("Facebook Pixel");

if (html.includes("doubleclick"))
    trackers.push("DoubleClick");

if (html.includes("hotjar"))
    trackers.push("Hotjar");

if (html.includes("tiktok"))
    trackers.push("TikTok Pixel");

// ==========================================
// Popup asks for trackers
// ==========================================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "GET_TRACKERS") {

        sendResponse({

            trackers: trackers

        });

    }

});

// ==========================================
// Login Detection
// ==========================================

const passwordFields =
    document.querySelectorAll("input[type='password']");

const emailFields =
    document.querySelectorAll("input[type='email']");

const forms =
    document.querySelectorAll("form");

const isLoginPage =
    passwordFields.length > 0 ||
    emailFields.length > 0 ||
    forms.length > 0;

// ==========================================
// Suspicious Domain Detection
// ==========================================

const hostname =
    window.location.hostname.toLowerCase();

const suspiciousDomains = [

    ".xyz",
    ".top",
    ".click",
    ".gq",
    ".cf",
    ".ml",
    ".ga",
    ".tk"

];

let suspiciousDomain = false;

for (const domain of suspiciousDomains) {

    if (hostname.endsWith(domain)) {

        suspiciousDomain = true;
        break;

    }

}

// ==========================================
// Warning Overlay
// ==========================================

if (typeof showWarning === "function") {

    if (suspiciousDomain && isLoginPage) {

        showWarning(

            "🚨 HIGH RISK PHISHING WEBSITE",

            "This website contains a login form on a suspicious domain. Never enter passwords here.",

            "#dc2626"

        );

    }
    else if (suspiciousDomain) {

        showWarning(

            "⚠ Suspicious Website",

            "This website uses a suspicious domain. Browse carefully.",

            "#d97706"

        );

    }

}