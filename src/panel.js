(function(window, document) {
    window.onload = function() {
        const fontInput = document.getElementById('font-input');

        chrome.storage.sync.get({
            fontFamily: 'monospace'
        }, items => {
            fontInput.value = items.fontFamily;
        });

        fontInput.addEventListener('input', e => {
            const { value } = e.target;
            chrome.storage.sync.set({
                fontFamily: value
            });
        });
    };
})(window, document);
