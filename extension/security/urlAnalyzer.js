// =====================================
// Cyvora AI - URL Risk Analyzer
// Version 1.0
// =====================================

function analyzeURL(url) {

    let score = 100;

    let report = [];

    const hostname = new URL(url).hostname.toLowerCase();

    // ------------------------
    // HTTPS Check
    // ------------------------

    if (url.startsWith("https://")) {

        report.push("✅ HTTPS Enabled");

    } else {

        score -= 30;
        report.push("❌ Website is NOT using HTTPS");

    }

    // ------------------------
    // Suspicious Domains
    // ------------------------

    const suspiciousTLD = [

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

    suspiciousTLD.forEach(tld => {

        if (hostname.endsWith(tld)) {

            score -= 20;

            report.push("❌ Suspicious Domain (" + tld + ")");

        }

    });

    // ------------------------
    // IP Address Detection
    // ------------------------

    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {

        score -= 40;

        report.push("❌ Website uses IP Address");

    }

    // ------------------------
    // Very Long URL
    // ------------------------

    if (url.length > 120) {

        score -= 15;

        report.push("⚠ Very Long URL");

    }

    // ------------------------
    // @ Symbol
    // ------------------------

    if (url.includes("@")) {

        score -= 20;

        report.push("⚠ URL contains @ symbol");

    }

    // ------------------------
    // Double Slash Trick
    // ------------------------

    if (url.includes("//") && url.lastIndexOf("//") > 8) {

        score -= 20;

        report.push("⚠ Redirect Pattern Found");

    }

    // ------------------------
    // Final Score
    // ------------------------

    if (score < 0) {

        score = 0;

    }

    let status = "SAFE";

    if (score <= 80)
        status = "SUSPICIOUS";

    if (score <= 50)
        status = "DANGEROUS";

    return {

        score,

        status,

        report

    };

}