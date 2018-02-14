(function(window, document) {

    const fontsDisplayContainer = document.getElementById('saved-fonts');
    const fontFamilyField = document.getElementById('font-family');


    function getFontUrls() {
        const fonturls = [];
        fontsDisplayContainer
            .querySelectorAll('p.url')
            .forEach(n => {
                fonturls.push(n.innerText);
            });
        return fonturls;
    }

    function saveOptions() {
        const fontFamily = fontFamilyField.value;
        function updateStatus() {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }

        chrome.storage.sync.set({
            fontFamily: fontFamily,
            externalFonts: getFontUrls()
        }, updateStatus);
    }

    function createFontUrlOption(fontUrl, fontsDisplayContainer) {
        return (function(fontUrl) {
            const tag = document.createElement('div');
            tag.innerHTML = `
                <span>
                    <p class="url">${fontUrl}</p>&nbsp|&nbsp<a href="#" data-action="delete">delete</a>
                </span>
            `;
            return tag;
        })(fontUrl, fontsDisplayContainer.children.length);
    }

    function addExtFont() {
        const fontUrl = document.getElementById('ext-font-inpt').value;
        const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
        if (!urlRegex.test(fontUrl)) {
            window.alert('please enter valid url');
            return;
        }

        fontsDisplayContainer.appendChild(
            createFontUrlOption(fontUrl, fontsDisplayContainer)
        );
    }

    function restoreOptions() {
        // default value for fontFamily = 'monospace'
        chrome.storage.sync.get({
            fontFamily: 'monospace',
            externalFonts: []
        }, items => {

            fontFamilyField.value = items.fontFamily;
            items.externalFonts.forEach(fontUrl => {
                fontsDisplayContainer.appendChild(
                    createFontUrlOption(fontUrl, fontsDisplayContainer)
                );
            });
        });
    }

    function handleDeleteExtfont(e) {
        if (e.target.dataset.action === 'delete') {
            e.preventDefault();
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        }
    }


    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save')
        .addEventListener('click', saveOptions);
    document.getElementById('add-ext-font')
        .addEventListener('click', addExtFont);
    fontsDisplayContainer.addEventListener('click', handleDeleteExtfont);

})(window, document);
