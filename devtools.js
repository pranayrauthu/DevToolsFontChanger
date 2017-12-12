

const styleTemplate = (fontFamily) => `

    :host-context(.platform-windows) .monospace, 
    :host-context(.platform-windows) .source-code, 
    .platform-windows .monospace, .platform-windows .source-code,
    :host-context(.platform-mac) .monospace,
    :host-context(.platform-mac) .source-code,
    .platform-mac .monospace, .platform-mac .source-code {
        font-family: ${fontFamily} !important;
    }

`;

chrome.storage.sync.get({
    fontFamily: 'monospace'
}, function (items) {
    chrome.devtools.panels.applyStyleSheet(styleTemplate(items.fontFamily));
});
