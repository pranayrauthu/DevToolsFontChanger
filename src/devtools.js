(function() {

    const styleTemplate = fontFamily => `

        :host-context(.platform-windows) .monospace, 
        :host-context(.platform-windows) .source-code, 
        .platform-windows .monospace, .platform-windows .source-code,
        :host-context(.platform-mac) .monospace,
        :host-context(.platform-mac) .source-code,
        .platform-mac .monospace, .platform-mac .source-code,
        :host-context(.platform-linux) .monospace, 
        :host-context(.platform-linux) .source-code, 
        .platform-linux .monospace, .platform-linux .source-code {
            font-family: ${fontFamily} !important;
        }

    `;

    chrome.storage.sync.get({
        fontFamily: 'monospace',
        externalFonts: []
    }, items => {
        items.externalFonts.forEach(url => {
            fetch(url).then(resp => {
                return resp.text();
            }).then(resp => {
                chrome.devtools.panels.applyStyleSheet(resp);
            });
        });
        chrome.devtools.panels.applyStyleSheet(styleTemplate(items.fontFamily));
    });

    chrome.devtools.panels.create('Devtools Font Changer',
        'devtool.png',
        'panel.html'
    );

})();
