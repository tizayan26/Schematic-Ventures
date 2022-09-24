chrome.browserAction.onClicked.addListener((tab)=>{
    chrome.tabs.sendMessage(tab.id, "toggle");
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.call) {
        case "getList":
            var url = request.url;
            return fetch(url, request.obj)
                .then(response => response.text())
                .then(text => sendResponse(text))
                .catch(error => console.log(error)), !0;
        case "getToken":
            return chrome.identity.launchWebAuthFlow(
                {
                    "url" : "https://www.dropbox.com/oauth2/authorize?redirect_uri="
                    +encodeURIComponent(chrome.identity.getRedirectURL())
                    +"&client_id=" + 'fbfpvsljklipr52'
                    +"&response_type=token",
                "interactive" : true
                },
                function(redirect_url){
                
                    var auth_token = redirect_url.substr(chrome.identity.getRedirectURL().length+6);
                    let queryString = new URLSearchParams(auth_token);
                    var array = Array.from(queryString.entries());
                    sendResponse(array[0][1]);
                    
                }
            ), !0;
        case "reboot":
            chrome.runtime.reload(),chrome.runtime.restart()
            return sendResponse("Restarted Successfully!"),!0;
        // return true;
    }
})

chrome.identity.getProfileUserInfo((userInfo) => {
    console.log(userInfo);
});