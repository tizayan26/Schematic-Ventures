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

    $('#popsn').change(function(){
        chrome.storage.local.set({popsn: $('#popsn').prop('checked'),orsn: $('#orsn').val()}, function() {
            console.log('popsn is set to ' + $('#popsn').prop('checked') +'orsn = '+$('#orsn').val());
        });
    });
    $('#poplead').change(function(){
        chrome.storage.local.set({poplead: $('#poplead').prop('checked'),orlead: $('#orlead').val()}, function() {
            console.log('poplead is set to ' + $('#poplead').prop('checked') +'orlead = '+$('#orlead').val());
        });
    });
    $('#popurl').change(function(){
        chrome.storage.local.set({popurl: $('#popurl').prop('checked'),orurl: $('#orurl').val()}, function() {
            console.log('popurl is set to ' + $('#popurl').prop('checked') +'orurl = '+$('#orurl').val());
        });
    });
    $('#popdesc').change(function(){
        chrome.storage.local.set({popdesc: $('#popdesc').prop('checked'),ordesc: $('#ordesc').val()}, function() {
            console.log('popdesc is set to ' + $('#popdesc').prop('checked') +'ordesc = '+$('#ordesc').val());
        });
    });
    $('#popstat').change(function(){
        chrome.storage.local.set({popstat: $('#popstat').prop('checked'),orstat: $('#orstat').val()}, function() {
            console.log('popstat is set to ' + $('#popstat').prop('checked') +'orstat = '+$('#orstat').val());
        });
    });
    $('#popsrc').change(function(){
        chrome.storage.local.set({popstat: $('#popsrc').prop('checked'),orsrc: $('#orsrc').val()}, function() {
            console.log('popsrc is set to ' + $('#popsrc').prop('checked') +'orsrc = '+$('#orsrc').val());
        });
    });
    $('#popver').change(function(){
        chrome.storage.local.set({popver: $('#popver').prop('checked'),orver: $('#orver').val()}, function() {
            console.log('popver is set to ' + $('#popver').prop('checked') +'orver = '+$('#orver').val());
        });
    });
    $('#popstg').change(function(){
        chrome.storage.local.set({popstg: $('#popstg').prop('checked'),orstg: $('#orstg').val()}, function() {
            console.log('popstg is set to ' + $('#popstg').prop('checked') +'orstg = '+$('#orstg').val());
        });
    });


    chrome.storage.local.get(['galways','lalways','walways','gmatch','lmatch','popsn','poplead','orlead','popurl','popver','orver','popstg','orstg'], function(result) {
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
        if(result.popsn!=undefined){
            $('#popsn').prop('checked',result.popsn);
        }

        if(result.poplead!=undefined){
            $('#poplead').prop('checked',result.poplead);
        }
        if(result.orlead!=undefined){
            $('#orlead').val(result.orlead);
        }
        
        if(result.popver!=undefined){
            $('#popver').prop('checked',result.popver);
        }
        if(result.orver!=undefined){
            $('#orver').val(result.orver);
        }
        
        if(result.popstg!=undefined){
            $('#popstg').prop('checked',result.popstg);
        }
        if(result.orstg!=undefined){
            $('#orstg').val(result.orstg);
        }

        if(result.popurl!=undefined){
            $('#popurl').prop('checked',result.popurl);
        }
        if(result.popdesc!=undefined){
            $('#popdesc').prop('checked',result.popdesc);
        }
        if(result.popstat!=undefined){
            $('#popstat').prop('checked',result.popstat);
        }
        if(result.popsrc!=undefined){
            $('#popsrc').prop('checked',result.popsrc);
        }
    })
})