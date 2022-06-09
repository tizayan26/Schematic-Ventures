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
    


    // shadowRootPopup.querySelector('input[type=file]').addEventListener('change', (event) => {
    //   const files = event.target.files[0];
    //   const token = {};
    // //   const cancel = shadowRootPopup.getElementById('cancel');
    // //   const pause = shadowRootPopup.getElementById('pause');
    // //   const resume = shadowRootPopup.getElementById('resume');
  
    // //   [cancel, resume, pause].forEach((btn) => {
    // //     const id = btn.id;
    // //     btn.addEventListener('click', () => {
    // //       token[id]();
    // //     });
    // //   });
  
    //   client.upload(files, { onProgress }, {}, token)
    //     .then(res => {
    //     //   console.log('success: ', res)
    //       file_obj = [
    //         {
    //             // size: res['_file'].size,
    //             url: res.url,
    //             // type:  res['_file'].type,
    //             // filename:  res['_file'].name,
    //         }
    //     ]
    //     console.log(file_obj)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     });
    // });
  
});