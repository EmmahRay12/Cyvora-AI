// ==========================================
// Cyvora AI Login Analyzer
// Version 1.0
// ==========================================

function detectLoginPage() {

    const passwordFields =
        document.querySelectorAll("input[type='password']");

    const emailFields =
        document.querySelectorAll("input[type='email']");

    const forms =
        document.querySelectorAll("form");

    return {

        isLogin:

            passwordFields.length > 0 ||

            emailFields.length > 0 ||

            forms.length > 0,

        passwordFields:

            passwordFields.length,

        emailFields:

            emailFields.length,

        forms:

            forms.length

    };

}

export {

    detectLoginPage

};