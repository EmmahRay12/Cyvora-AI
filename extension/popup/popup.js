document.addEventListener("DOMContentLoaded", async () => {

    const website = document.getElementById("website");
    const protocol = document.getElementById("protocol");
    const domain = document.getElementById("domain");
    const risk = document.getElementById("risk");
    const reputation = document.getElementById("reputation");
    const threatScore = document.getElementById("threatScore");
const riskCategory = document.getElementById("riskCategory");
const confidence = document.getElementById("confidence");
const lastScan = document.getElementById("lastScan");

    const reasons = document.getElementById("reasons");
    const trackersList = document.getElementById("trackers");

    // ===========================
    // Get Current Tab
    // ===========================

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const url = tab.url;

    website.textContent = url;

    const urlObj = new URL(url);

    protocol.textContent = urlObj.protocol.replace(":", "").toUpperCase();
    domain.textContent = urlObj.hostname;

    // ===========================
    // Website Reputation
    // ===========================

    const trustedDomains = [

        "google.com",
        "github.com",
        "microsoft.com",
        "apple.com",
        "amazon.com",
        "netflix.com",
        "openai.com",
        "wikipedia.org",
        "mozilla.org",
        "cloudflare.com"

    ];

    let trusted = false;

    trustedDomains.forEach(site => {

        if (

            urlObj.hostname === site ||

            urlObj.hostname.endsWith("." + site)

        ) {

            trusted = true;

        }

    });

    if (trusted) {

        reputation.textContent = "★★★★★ Trusted";

    } else {

        reputation.textContent = "★★☆☆☆ Unknown";

    }

    // ===========================
    // Risk Engine
    // ===========================

    let score = 100;

    let messages = [];

    if (url.startsWith("https://")) {

        messages.push("✅ HTTPS Enabled");

    } else {

        score -= 30;

        messages.push("❌ Website is NOT using HTTPS");

    }

    const badDomains = [

        ".xyz",
        ".top",
        ".click",
        ".monster",
        ".zip",
        ".gq",
        ".tk",
        ".ml",
        ".cf"

    ];

    badDomains.forEach(tld => {

        if (urlObj.hostname.endsWith(tld)) {

            score -= 20;

            messages.push("❌ Suspicious Domain (" + tld + ")");

        }

    });

    if (/^\d+\.\d+\.\d+\.\d+$/.test(urlObj.hostname)) {

        score -= 40;

        messages.push("❌ Website uses IP Address");

    }

    if (url.length > 120) {

        score -= 15;

        messages.push("⚠ Very Long URL");

    }

    if (url.includes("@")) {

        score -= 20;

        messages.push("⚠ URL contains @");

    }

    if (url.includes("//") && url.lastIndexOf("//") > 8) {

        score -= 20;

        messages.push("⚠ Redirect Pattern Found");

    }

    if (score < 0)
        score = 0;

    let status = "🟢 SAFE";

    if (score <= 80)
        status = "🟡 SUSPICIOUS";

    if (score <= 50)
        status = "🔴 DANGEROUS";

    risk.textContent = `${status} (${score}/100)`;
    threatScore.textContent = (100 - score) + "%";

if (score >= 90) {

    riskCategory.textContent = "Low";

} else if (score >= 70) {

    riskCategory.textContent = "Medium";

} else {

    riskCategory.textContent = "High";

}

confidence.textContent = score + "%";

lastScan.textContent =
    new Date().toLocaleString();

    reasons.innerHTML = "";

    messages.forEach(msg => {

        const li = document.createElement("li");

        li.textContent = msg;

        reasons.appendChild(li);

    });

    // ===========================
    // Tracker Detection
    // ===========================

    chrome.tabs.sendMessage(tab.id, {

        action: "GET_TRACKERS"

    }, (response) => {

        trackersList.innerHTML = "";

        if (chrome.runtime.lastError) {

            const li = document.createElement("li");

            li.textContent = "Unable to detect trackers";

            trackersList.appendChild(li);

            return;

        }

        if (!response || response.trackers.length === 0) {

            const li = document.createElement("li");

            li.textContent = "No Known Trackers";

            trackersList.appendChild(li);

            return;

        }

        response.trackers.forEach(tracker => {

            const li = document.createElement("li");

            li.textContent = tracker;

            trackersList.appendChild(li);

        });

    });

});