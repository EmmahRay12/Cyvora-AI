// =====================================
// Cyvora AI Report Generator
// =====================================

function generateVerdict(score, findings) {

    if (score >= 90) {

        return "This website appears to be safe based on the current security checks.";

    }

    if (score >= 70) {

        return "This website shows some suspicious indicators. Proceed with caution.";

    }

    if (score >= 50) {

        return "This website has multiple security risks. Avoid entering sensitive information.";

    }

    return "High Risk! This website may be attempting phishing or other malicious activity.";

}

export {

    generateVerdict

};