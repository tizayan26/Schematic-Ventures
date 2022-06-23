$(document).ready(function(){
    loadPopup();
    chrome.runtime.onMessage.addListener(function(msg, sender) {
        switch (msg) {
            case "toggle":
                $('#shadow-wrapper-popup-sv').slideToggle("slow");
                break;
        }
    });
    switch(window.location.hostname){
        case "mail.google.com":
            chrome.storage.local.get(['galways'], function(result) {
                console.log('Value currently is ' + result.galways);
                if(result.galways){
                    $('#shadow-wrapper-popup-sv').slideToggle("slow");
                }
            }),!0;
        case "www.linkedin.com":
            chrome.storage.local.get(['lalways'], function(result) {
                console.log('Value currently is ' + result.lalways);
                if(result.lalways){
                    $('#shadow-wrapper-popup-sv').slideToggle("slow");
                }
            }),!0;
        default:
            chrome.storage.local.get(['walways'], function(result) {
                console.log('Value currently is ' + result.walways);
                if(result.walways){
                    $('#shadow-wrapper-popup-sv').slideToggle("slow");
                }
            }),!0;
    }
});