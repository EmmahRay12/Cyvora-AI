console.log("Cyvora AI Warning Overlay Loaded");

function showWarning(title, message, color) {

    if (document.getElementById("cyvora-warning")) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.id = "cyvora-warning";

    overlay.innerHTML = `
    <div id="cyvora-box">

        <h2>🛡️ Cyvora AI</h2>

        <h3>${title}</h3>

        <p>${message}</p>

        <div class="buttons">

            <button id="leaveBtn">
                Leave Website
            </button>

            <button id="continueBtn">
                Continue Anyway
            </button>

        </div>

    </div>
    `;

    document.body.appendChild(overlay);

    // ---------- CSS ----------

    const style = document.createElement("style");

    style.textContent = `

#cyvora-warning{

position:fixed;

top:0;

left:0;

width:100%;

height:100%;

background:rgba(0,0,0,.65);

z-index:999999999;

display:flex;

justify-content:center;

align-items:center;

backdrop-filter:blur(6px);

}

#cyvora-box{

width:430px;

background:#111827;

border-radius:18px;

padding:30px;

text-align:center;

color:white;

font-family:Arial;

box-shadow:0 0 30px rgba(0,0,0,.5);

border:2px solid ${color};

animation:popup .35s ease;

}

#cyvora-box h2{

margin:0;

font-size:30px;

color:#4ade80;

}

#cyvora-box h3{

margin-top:20px;

color:${color};

}

#cyvora-box p{

margin-top:15px;

font-size:16px;

line-height:1.6;

}

.buttons{

margin-top:30px;

display:flex;

gap:15px;

justify-content:center;

}

button{

border:none;

padding:12px 20px;

border-radius:8px;

font-size:15px;

cursor:pointer;

font-weight:bold;

}

#leaveBtn{

background:#dc2626;

color:white;

}

#continueBtn{

background:#16a34a;

color:white;

}

button:hover{

opacity:.9;

}

@keyframes popup{

from{

transform:scale(.8);

opacity:0;

}

to{

transform:scale(1);

opacity:1;

}

}

`;

    document.head.appendChild(style);

    // Leave Website

    document.getElementById("leaveBtn").onclick = () => {

        window.location.href = "https://www.google.com";

    };

    // Continue Anyway

    document.getElementById("continueBtn").onclick = () => {

        overlay.remove();

        style.remove();

    };

}

// ------------------------------

const domain = window.location.hostname;

// HIGH RISK

if (domain.endsWith(".xyz")) {

    showWarning(

        "Suspicious Website",

        "This website uses a .xyz domain. These domains are sometimes abused for phishing, fake streaming, malware, or scam campaigns. Continue only if you trust this website.",

        "#f59e0b"

    );

}

// VERY HIGH RISK

if (domain.includes("login-secure")) {

    showWarning(

        "Phishing Warning",

        "This page looks suspicious and may attempt to steal your password.",

        "#ef4444"

    );

}