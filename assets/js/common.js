const shadowWrapper_popup = document.createElement('div');
shadowWrapper_popup.id = "shadow-wrapper-popup-sv";
shadowWrapper_popup.style = "position: fixed;top: 10px;right: 0;z-index:99999999;display:none;width:340px;height:100%;overflow:auto;";
$('body').prepend($(shadowWrapper_popup))
const host_popup = document.getElementById('shadow-wrapper-popup-sv');
const shadowRootPopup = host_popup.attachShadow({
    mode: 'open'
});

const API_KEY = 'keyrTQZpPSBqp3gG2';
const BASE = 'appMVKyhjdZhMRbRP';

const apikey = 'AoBsiYljQquaMb32LlHewz';
const client = filestack.init(apikey);

var file_obj = null;

let extractEmails = (text) =>
{
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    // return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-][^?!(jpg|jpeg|png|gif|doc|docx|psd|eps)]+)/gi);
    // var arr = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}


let getUnique = (array) => {
    var uniqueArray = [];
    
    // Loop through array values
    for(i=0; i < array.length; i++){
        var domain = array[i].split('@')[1];
        console.log(domain);
        if(domain!= 'schematicventures.com' && uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}



let checkDropbox = (name) => {
    chrome.runtime.sendMessage({call:'getToken'}, (response) => {
        // 3. Got an asynchronous response with the data from the background
        console.log('received user data', response);
        var req_body = {
            "query": name,
            "include_highlights":false,
            "options":{"path":"/Analyst_Central"}
        }
        fetch("https://api.dropboxapi.com/2/files/search_v2", {
        body: JSON.stringify(req_body),
        headers: {
            Authorization: "Bearer "+response,
            "Content-Type": "application/json",
            "Dropbox-Api-Select-User": "dbmid:AADOR_COkX-znaK_u0ytIVh9tJKr_C7Swsg"
        },
        method: "POST"
        }).then(response => response.text())
        .then(text => {
            result = JSON.parse(text);
            console.log(result.matches);
            if(result.matches.length===0){
                var req_body = {
                    "path":"/Analyst_Central/"+name
                }
                fetch("https://api.dropboxapi.com/2/files/create_folder_v2", {
                    body: JSON.stringify(req_body),
                    headers: {
                        Authorization: "Bearer "+response,
                        "Content-Type": "application/json",
                        "Dropbox-Api-Select-User": "dbmid:AADOR_COkX-znaK_u0ytIVh9tJKr_C7Swsg"
                    },
                    method: "POST"
                    }).then(response => response.text())
                    .then(text => {
                       console.log(text);
                    });
            }
        });
    });
   
  
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};