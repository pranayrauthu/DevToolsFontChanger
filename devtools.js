

const styleTemplate = (fontFamily) => `

    :host-context(.platform-windows) .monospace, 
    :host-context(.platform-windows) .source-code, 
    .platform-windows .monospace, .platform-windows .source-code{
        font-family: ${fontFamily} !important;
    }

`;

chrome.storage.sync.get({
    fontFamily: 'monospace'
}, function (items) {
    chrome.devtools.panels.applyStyleSheet(styleTemplate(items.fontFamily));
});