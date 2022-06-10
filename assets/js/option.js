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
    $('#gmatch').change(function(){
        chrome.storage.local.set({gmatch: $('#gmatch').prop('checked')}, function() {
            console.log('gmatch is set to ' + $('#gmatch').prop('checked'));
        });
      
    });
    $('#lmatch').change(function(){
        chrome.storage.local.set({lmatch: $('#lmatch').prop('checked')}, function() {
            console.log('lmatch is set to ' + $('#lmatch').prop('checked'));
        });
      
    });
    $('#wmatch').change(function(){
        chrome.storage.local.set({wmatch: $('#wmatch').prop('checked')}, function() {
            console.log('wmatch is set to ' + $('#wmatch').prop('checked'));
        });
      
    });

    chrome.storage.local.get(['galways','lalways','walways','gmatch','lmatch'], function(result) {
        if(result.galways!=undefined){
            console.log('Value currently is ' + result.galways);
            $('#galways').prop('checked',result.galways);
        }
        if(result.lalways!=undefined){
            $('#lalways').prop('checked',result.lalways);
        }
        if(result.walways!=undefined){
            $('#walways').prop('checked',result.walways);
        }
        if(result.gmatch!=undefined){
            $('#gmatch').prop('checked',result.gmatch);
        }
        if(result.lmatch!=undefined){
            $('#lmatch').prop('checked',result.lmatch);
        }
        if(result.wmatch!=undefined){
            $('#wmatch').prop('checked',result.wmatch);
        }
    })
})