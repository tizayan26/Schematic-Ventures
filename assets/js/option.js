$(document).ready(()=>{
    $('#galways').change(function(){
        chrome.storage.local.set({galways: $('#galways').prop('checked')}, function() {
            console.log('galways is set to ' + $('#galways').prop('checked'));
        });
        
    });
    $('#lalways').change(function(){
        chrome.storage.local.set({lalways: $('#lalways').prop('checked')}, function() {
            console.log('lalways is set to ' + $('#lalways').prop('checked'));
        });
    });
    $('#walways').change(function(){
        chrome.storage.local.set({walways: $('#walways').prop('checked')}, function() {
            console.log('walways is set to ' + $('#walways').prop('checked'));
        });
      
    });

    chrome.storage.local.get(['galways','lalways','walways'], function(result) {
        if(result.galways!=undefined){
            console.log('Value currently is ' + result.galways);
            $('#galways').prop('checked',result.galways)
        }
        if(result.lalways!=undefined){
            $('#lalways').prop('checked',result.lalways)
        }
        if(result.walways!=undefined){
            $('#walways').prop('checked',result.walways)
        }

    })
})