

fetch("/style.css").then(function (resp) {
    return resp.text();
}).then(function (respText) {
    chrome.devtools.panels.applyStyleSheet(respText);
})