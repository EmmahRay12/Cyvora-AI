// ==========================================
// Cyvora AI Reputation Engine
// Version 1.0
// ==========================================

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

function getWebsiteReputation(hostname){

    hostname = hostname.toLowerCase();

    for(const domain of trustedDomains){

        if(
            hostname === domain ||
            hostname.endsWith("." + domain)
        ){

            return{

                score:100,

                stars:"★★★★★",

                label:"Trusted"

            };

        }

    }

    return{

        score:50,

        stars:"★★☆☆☆",

        label:"Unknown"

    };

}

export{

    getWebsiteReputation

};