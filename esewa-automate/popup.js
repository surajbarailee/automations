document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.getElementById('startButton');
    var numberInput = document.getElementById('numberInput');

    startButton.addEventListener('click', function() {
        var numberOfLoops = parseInt(numberInput.value);
        if (isNaN(numberOfLoops) || numberOfLoops < 2) {
            alert("Please enter a valid number greater than 1");
            return;
        }

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'startClicking', loops: numberOfLoops});
        });
    });
});
