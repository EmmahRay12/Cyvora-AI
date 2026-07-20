console.log("Cyvora AI Popup Loaded");

const scanButton = document.getElementById("scanBtn");
const websiteText = document.getElementById("website");

scanButton.addEventListener("click", async () => {

    alert("Button Clicked");

    try {

        const tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        console.log(tabs);

        alert(JSON.stringify(tabs[0]));

        websiteText.textContent = tabs[0].url;

    } catch (error) {

        alert(error.message);

        websiteText.textContent = error.message;

    }

});