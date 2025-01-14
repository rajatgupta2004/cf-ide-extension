const script = document.createElement('script');
script.src = chrome.runtime.getURL('content.js');
script.onload = () => {
    console.log("Script Loaded successully");
};

document.body.appendChild(script);
