// Saves options to chrome.storage
function save_options() {
    var fontFamily = document.getElementById('font-family').value;
    function updateStatus() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    }

    chrome.storage.sync.set({
        fontFamily: fontFamily
    }, updateStatus);
}

// Restores font-familt input state using the preferences
// stored in chrome.storage.
function restore_options() {
    // default value for fontFamily = 'monospace'
    chrome.storage.sync.get({
        fontFamily: 'monospace'
    }, function (items) {
        document.getElementById('font-family').value = items.fontFamily;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save')
    .addEventListener('click', save_options);